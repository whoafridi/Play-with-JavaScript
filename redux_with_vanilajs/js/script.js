// selecting dom elements
const counterEl = document.getElementById("counter");
const incrementEl = document.getElementById("increment");
const decrementEl = document.getElementById("decrement");
const resetEl = document.getElementById("reset");
const addcounterEl = document.getElementById("addcounter");
const lol = document.getElementById("lol");

// actions type
const INCREMENT = "increment";
const DECREMENT = "decrement";

const increment = (count) => {
  return {
    type: INCREMENT,
    payload: count,
  };
};

const decrement = (count) => {
  return {
    type: DECREMENT,
    payload: count,
  };
};

// inistai state
const initialState = {
  count: 0,
};

// reducers
function counterReducer(state = initialState, action) {
  if (action.type === INCREMENT) {
    return {
      ...state,
      count: state.count + action.payload,
    };
  } else if (action.type === DECREMENT) {
    if (state.count - 1 <= -1) {
      alert(`can't be less than zero`);
      return {
        ...state,
        count: (state.count = 0),
      };
    }
    return {
      ...state,
      count: state.count - action.payload,
    };
  } else {
    return state;
  }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();
  counterEl.innerText = state.count.toString();
};

// render inistial value
render();

store.subscribe(render);

// add event listners
incrementEl.addEventListener("click", () => {
  store.dispatch(increment(2));
});

decrementEl.addEventListener("click", () => {
  store.dispatch(decrement(3));
});

// add counter
addcounterEl.addEventListener("click", () => {
  lol.innerHTML += `
    <div class="mx-auto max-w-md mt-10 space-y-5">
    <div
                class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
            >
                <div id="counter1" class="text-2xl font-semibold"></div>
                <div class="flex space-x-3">
                    <button
                        id="increment1"
                        class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
                    >
                        Increment
                    </button>
                    <button
                        id="decrement1"
                        class="bg-red-400 text-white px-3 py-2 rounded shadow"
                    >
                        Decrement
                    </button>
                </div>
                </div>
            </div>
    `;
});

resetEl.addEventListener("click", () => {
  console.log("reset");
});
