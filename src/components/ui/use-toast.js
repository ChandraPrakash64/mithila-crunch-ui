import { useState, useEffect } from "react"

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

let count = 0
function generateId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

const toastStore = {
  state: {
    toasts: [],
  },
  listeners: [],
  
  getState: () => toastStore.state,
  
  setState: (nextState) => {
    if (typeof nextState === 'function') {
      toastStore.state = nextState(toastStore.state)
    } else {
      toastStore.state = { ...toastStore.state, ...nextState }
    }
    
    toastStore.listeners.forEach(listener => listener(toastStore.state))
  },
  
  subscribe: (listener) => {
    toastStore.listeners.push(listener)
    return () => {
      toastStore.listeners = toastStore.listeners.filter(l => l !== listener)
    }
  }
}

let memory = {
  toasts: [],
  timeouts: new Map(),
};

const dispatch = (action) => {
  if (action.type === 'ADD_TOAST') {
    const { toasts } = memory;
    const newToast = action.toast;
    const id = generateId();

    const GHOST_TIME = action.toast.duration || 5000;
    
    memory = { ...memory, toasts: [ { ...newToast, id }, ...toasts ].slice(0, TOAST_LIMIT) };

    const addToRemoveQueue = () => {
      if (memory.timeouts.has(id)) {
        return
      }

      const timeout = setTimeout(() => {
        memory.timeouts.delete(id)
        dispatch({
          type: 'DISMISS_TOAST',
          toastId: id,
        })
      }, GHOST_TIME)

      memory.timeouts.set(id, timeout)
    };

    addToRemoveQueue();
  } else if (action.type === 'UPDATE_TOAST') {
    if (action.toast.id) {
      clearTimeout(memory.timeouts.get(action.toast.id))
    }
    memory = { ...memory, toasts: memory.toasts.map(t => t.id === action.toast.id ? { ...t, ...action.toast } : t) };
  } else if (action.type === 'DISMISS_TOAST') {
    if (action.toastId) {
      clearTimeout(memory.timeouts.get(action.toastId));
      memory = { ...memory, toasts: memory.toasts.filter(t => t.id !== action.toastId) };
    } else {
      memory.toasts.forEach(toast => {
        clearTimeout(memory.timeouts.get(toast.id));
      });
      memory = { ...memory, toasts: [] };
    }
  }
  
  toastStore.setState({ toasts: memory.toasts });
};

export const toast = ({ ...props }) => {
  const id = generateId()

  const update = (props) => dispatch({
    type: 'UPDATE_TOAST',
    toast: { ...props, id },
  });
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      update,
      dismiss,
    },
  });

  return {
    id,
    dismiss,
    update,
  }
}

export function useToast() {
  const [state, setState] = useState(toastStore.getState());
  
  useEffect(() => {
    const unsubscribe = toastStore.subscribe(setState);
    return unsubscribe;
  }, []);
  
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  }
}