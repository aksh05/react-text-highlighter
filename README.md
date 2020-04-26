
## React Text Highlighter Plugin
 
 *The plugin takes a seach parameter as its input and highlights it in the containing html.*

  List of functionalities supported:
  - Accepts string\array of strings or regex as search parameters.
  - Can have custom classes for highlighted elements as well as plain elements.
  - Can have custom wrapper elements for highlighted and normal words.
  - Support HTML nodes or React Components(only which have dom elements as children) as children.
  - Supports both global and first occurence search.
  
#### **Usage**
<hr />
For basic usage pass in a search parameter.

```jsx static
<TextHighlighter search="hello">Hello I am a basic example</TextHighlighter>
```
Above code will highlight the word `hello` in the contained text.


#### You can pass in your jsx inside the component as well. The plugin will parse and highlight all the ocurrences by default.
```jsx static
<TextHighlighter search="test">
    <div>
        <p>This is a test paragraph.</p>
        <label>This is a test label 1</label>
        <section>
            <label>This is a test label 2</label>
        </section>
    </div>
</TextHighlighter>
```

You can also pass your react component as a child. But your component should have all of its JSX (which is rendered) as its children. For example
```jsx static
<TextHighlighter search="component">
    <MyComponent>
        <span>This is my component</span>
    </MyComponent>
</TextHighlighter>
```

*This is because of the fact that parent would not know about any jsx inside child unless it is passed as child component's children. You can read more about this <a target="_blank" href="https://reactjs.org/docs/react-dom.html">here</a>*.
<br />
#### **Other expamples**
<hr />
* <strong>*Passing multiple search parameters*</strong>
<br /><br />
You can customise by passing in multiple search parameters or a regex.

```jsx static
<TextHighlighter search={["test", "heading"]}>
    <div>
        <p>This is a test heading.</p>
        <label>This is a test label 1</label>
        <section>
            <label>This is a test label 2</label>
        </section>
    </div>
</TextHighlighter>
```
Or a regex.
```jsx static
<TextHighlighter search={/[a-dA-d]/}>
    <div>
        <p>This is a test heading.</p>
        <label>This is a test label 1</label>
        <section>
            <label>This is a test label 2</label>
        </section>
    </div>
</TextHighlighter>
```
```jsx
<TextHighlighter search={/[a-dA-d]/}>
    <div>
        <p>This is a test heading.</p>
        <label>This is a test label 1</label>
        <section>
            <label>This is a test label 2</label>
        </section>
    </div>
</TextHighlighter>
```
* <strong>*Custom styling for highlighted words*</strong>
<br /><br />
You can change the styling of you highlighted texts by passing in cutom classes.
```jsx static
<TextHighlighter search="hello" highlightClass="mycustomclass">Hello I am a basic example</TextHighlighter>
```



 
 
