// React
import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
  useReducer,
  useContext,
} from "react";

// 3rd party
import classnames from "classnames";

//Components
import { Button } from "../Button";

//Hooks
import { useFormTest } from "../../hooks/useFormTest";
import { useCountRenders } from "../../hooks/useCountRenders";

//Styles
import styles from "./index.module.scss";
import { UserContext, testContext } from "../../hooks/useContext";

//Style blocks for page
const SubSection = (props) => (
  <div className="mv-4">
    <p className="size-2">{props.title}</p>
    {props.children}
  </div>
);
const Section = (props) => (
  <div className="mb-6">
    <hr />
    <p className="size-4 pb-3">{props.title}</p>
    {props.children}
  </div>
);
const Box = (props) => <div className={styles.box}>{props.children}</div>;

//Use Callback
const CallBackComponent = React.memo(({ increment }) => {
  useCountRenders();
  return (
    <Box>
      <p className="textTertiary mr-4">
        CallBackComponent- Increment count from child component by 5
      </p>
      <Button
        tertiary
        styles="mr-4 mt-2"
        onClick={() => increment(5)}
        label="Increment"
      />
    </Box>
  );
});
const Square = React.memo(({ n, increment }) => {
  useCountRenders();
  return (
    <Box>
      <Button tertiary label={n} onClick={() => increment(n)} />
    </Box>
  );
});

//UseState- If an expensive initial state declare up here first
function expensiveInitialState() {
  return 10;
}

//Use Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};
const todoReducer = (state, action) => {
  switch (action.type) {
    case "add-todo":
      return {
        todos: [...state.todos, { text: action.todo, completed: false }],
        todoCount: state.todoCount + 1,
      };
    case "toggle-todo":
      return {
        todos: state.todos.map((todo, index) =>
          index === action.index
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
        todoCount: state.todoCount,
      };
    default:
      return state;
  }
};

function Hooks(props) {
  //Use state
  const [count, setCount] = useState(() => expensiveInitialState());
  const [values, handleChange] = useFormTest({ email: "", password: "" });

  //Use Effect
  useEffect(() => {
    console.log("password changing");
    return () => {
      console.log("unmounted");
    };
  }, [values.password]);

  //Use Ref
  const inputRef = useRef(() => console.log("function passed to ref"));

  //Use layout effect
  useLayoutEffect(() => {
    console.log(inputRef.current.getBoundingClientRect());
  }, []);

  //Use CallBack- this will only get created when count or setCount changes
  const increment = useCallback(
    (n) => {
      setCount((c) => setCount(c + n));
    },
    [setCount]
  );
  const faveNums = [7, 36, 2501];

  //Use Reducer
  const [count2, dispatch] = useReducer(reducer, 0);
  const [{ todos, todoCount }, todoDispatch] = useReducer(todoReducer, {
    todos: [],
    todoCount: 0,
  });
  const [text, setText] = useState("");

  //Use Context
  const { message, setMessage, user, setUser } = useContext(testContext);
  const login = async () => {
    return { id: 1, name: "Karin", email: "karin@gmail.com" };
  };

  return (
    <main style={{ textAlign: "left" }} className="quaternary textWhite p-4">
      <header className="row">
        <h1 className="size-5 bold textWhite">Hooks</h1>
      </header>
      <Section title="useState">
        <SubSection title="//Arrow function on update set state to prevent race cases">
          <Box>
            <p className="mb-2">Count: {count}</p>
            <Button
              tertiary
              onClick={(c) => setCount(c + 1)}
              label="Update count"
            />
          </Box>
        </SubSection>
        <SubSection title="//useFrom hook to update input fields state">
          <Box>
            <input
              name="email"
              value={values.email}
              onChange={handleChange}
              className="mb-2"
            />
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="mb-2"
            />
            <Button
              tertiary
              onClick={() => console.log(values)}
              label="Show state"
            />
          </Box>
        </SubSection>
      </Section>
      <Section title="useEffect">
        <SubSection title="//useEffect fires on shallow comparison of values passed to it."></SubSection>
        <SubSection title="//Multiple useEffect's fire in order."></SubSection>
        <SubSection title="//Persist to local sorage."></SubSection>
      </Section>
      <Section title="useRef">
        <SubSection title="//focus input field with ref. Does not cause re-render.">
          <Box>
            <input
              ref={inputRef}
              placeholder="Ref on me"
              type="text"
              className="mb-2"
            />
            <Button
              tertiary
              onClick={() => inputRef.current.focus()}
              label="Focus"
            />
          </Box>
        </SubSection>
        <SubSection title="//The above ref was also passed a console.log function" />

        <SubSection title="//Does not have to be a dom node. Can be put on component to show how many time rendered. " />
        <SubSection title="//Use to prevent setState on an unmounted component by passing ref = false to useEffect clean up, then only calling setState if ref.current is true."></SubSection>
      </Section>
      <Section title="useLayoutEffect">
        <SubSection title="//Useful to measure the width of dom element. "></SubSection>
      </Section>
      <Section title="useCallback">
        <SubSection title="//Memo looks at props and only re-renders if props passed in do change" />
        <SubSection
          title={`//Prevent needless re-render of functions when we use React.memo. Count: ${count} `}
        >
          <CallBackComponent increment={increment} />
        </SubSection>
        <SubSection
          title={`//Comes up a lot when looping over an array. Count: ${count}`}
        >
          {faveNums.map((n) => (
            <Square increment={increment} n={n} key={n} />
          ))}
        </SubSection>
      </Section>
      <Section title="useMemo">
        <SubSection title="//Optimise computed values"></SubSection>
      </Section>
      <Section title="useReducer">
        <SubSection title="//Look at use-immer library" />

        <SubSection title="//Storing state and alt to useState hooks when complex data">
          <Box>
            <p>Count2: {count2}</p>
            <div className="row">
              <Button
                onClick={() => dispatch({ type: "increment" })}
                tertiary
                label="Increment"
                styles="mr-2"
              />
              <Button
                onClick={() => dispatch({ type: "decrement" })}
                tertiary
                label="Decrement"
              />
            </div>
          </Box>
        </SubSection>
        <SubSection title="//Simple todo reducer">
          <Box>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                todoDispatch({ type: "add-todo", todo: text });
                setText("");
              }}
            >
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="type a todo"
              />
            </form>
            <p>Number of todos: {todoCount}</p>
            {todos.map((todo, index) => (
              <div
                className="mb-2"
                style={{
                  textDecoration: todo.completed ? "line-through" : "",
                  cursor: "pointer",
                }}
                key={index}
                onClick={() => todoDispatch({ type: "toggle-todo", index })}
              >
                {todo.text}
              </div>
            ))}
          </Box>
        </SubSection>
      </Section>
      <Section title="useContext">
        <SubSection title="//Access data across app">
          <Box>
            <p>
              Message: <strong>'{message}'</strong>
            </p>
            <Button
              tertiary
              label="Change context value"
              onClick={() =>
                setMessage(
                  "Global context message updated from with Hooks component"
                )
              }
            />
          </Box>
        </SubSection>
        <SubSection title="//Same one provider with seperate user state. Fake async login success">
          <Box>
            <pre>{JSON.stringify(user, null, 2)}</pre>

            {user ? (
              <Button tertiary label="Logout" onClick={() => setUser(null)} />
            ) : (
              <Button
                tertiary
                label="Login"
                onClick={async () => {
                  const user = await login();
                  setUser(user);
                }}
              />
            )}
          </Box>
        </SubSection>
      </Section>
    </main>
  );
}

Hooks.propTypes = {
  /**  */
};

export { Hooks };
