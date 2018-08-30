# form-example

This is an example that shows how to implement React helpers to build and maintain form.

The API is very similar to `redux-form` and `final-form` but I did no source code reading prior to developing this.

## Live demo
The demo is available on this [link](https://build-btbbnfwqty.now.sh). 

Submit errors can be caused by submitting 'fail please' in the `role` field or by submitting 'foo@bar.baz' in the `email` field.
## Scripts
- `yarn start` - start development server
- `yarn build` - build the bundle
- `yarn test` - run tests

## API
### Form
Accepts `onSubmit` and `pages` props. Pages are used to build wizard forms. Render function passes `submitting`, `submitFailed`, `submitFormError` props to the children.
```
  <Form onSubmit={console.log} pages={["foo", "bar"]}>
    {({ submitting, ... }) => (
      ...
    )}
  </Form>
```

### Field
Accepts `name`, `component`, `validator`, and `type` props.

Passed component should know how to manage the props Field passes to it and they are structured like this:
``` js
{
  input: {
    id,
    value,
    onChange,
    onBlur
  },
  meta: {
    pristine,
    error,
    submitError
  }
}
```

The `Field` is used like this:

```
<Field
  name="firstname"
  component={TextInput}
  validator={notEmpty}
/>
```

### FormPage
The `FormPage` is used to build multi-part (wizard) forms. It only accepts a `page` prop.

It will automatically render `Previous` and `Next` buttons. If there are errors on the page the user cannot go to the next page.

It is used like this:
```
<Form onSubmit={console.log} pages={["first", "second"]}>
  {() => (
    <React.Fragment>
      <FormPage page="first">
        <Field
          ...
        />
      </FormPage>
      <FormPage page="second">
        <Field
          ...
        />
        <button>Submit me</button>
      </FormPage>
    </React.Fragment>
  )}
</Form>

```