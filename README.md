# 🎩 Demo
## A lightweight jQuery walkthrough engine!

Demo is a really easy to use framework that allows you to build super easy onboarding for users simply by passing in an array.

Right now it's jQuery only because I am a past dweller but down the line as with all my open source scripts there will be a non jQuery flavour to help those with workflows with out it 😅

To get started install the `demo.js` script by including it after jquery or using cooker by myself by adding this script to the `resources/js/libraries` folder 👀

Demo includes the css needed and will attach it to the `head` tag of your site on startup, but can easily be overridden by any site styles you may have.

To initialise a walkthrough, create an walkthrough array and if needed pass an options array like so
```
d.build([
{
    // Walkthrough array (step one)
    title: 'Howdy partner!',
    text: 'This is demo by genericmilk, pretty cool right?!'
},
{
    // Walkthrough array (step two)
    element: $('button:first'),
    title: 'Elements',
    text: 'You can even attach the dialog box to an element and hihglight it in the darkness!,
    clickOnNext: true
}],{
    // Options array
    skippable: false
});
```

In this above demo there are 2 stages to the modal, the first has no `element` attached to it so the dialog will sit in the center of the screen. In the second step the first `button` element on the page will be highlighted and the modal box will move adjacent to it. The step also has `clickOnNext` meaning that on the `d.next();` function call which is run whenever the user advances the element will be clicked meaning you can chain multiple actions up through your app walking through an entire experience

This entire walkthrough is bound by the optional `options` array which is passed after the `walkthrough` array. In this specific walkthrough we have set `skippable` to have a `bool` of `false` meaning that there is no option for the user to end the tour early. The defaults can be seen below.

And that really is it! Simply chain up as many `walkthrough` options as you like and provide the `options` governing them. Refer to the tables below on how to customise and manipulate the tour!

### Walkthrough array keypairs
| Key               | Default | Expects         | Description                                                                                               |
|-------------------|---------|-----------------|-----------------------------------------------------------------------------------------------------------|
| title             | null    | String          | Specifies a modal title for this step                                                                     |
| text              | null    | String          | Specifies the text within the modal for this step                                                         |
| element           | null    | jQuery Selector | Specifies the page element that the modal will highlight and bind to                                      |
| clickOnNext       | false   | Boolean         | Elects if this element should automatically be clicked when the user advances                             |
| allowElementClick | false   | Boolean         | Elects if the element can be interacted with whilst the modal is open                                     |
| waitForInput      | false   | Boolean         | If true, hides the next controls and sets allowElementClick to true. Will only advance on a d.next() call |
| nextText          | Next    | String          | Changes the text the "Next" button displays in this step                                                  |

### Options array keypairs
| Key       | Default   | Expects         | Description                                                                                                 |
|-----------|-----------|-----------------|-------------------------------------------------------------------------------------------------------------|
| skippable | true      | Boolean         | Specifies if the tour can be skipped and exited early                                                       |
| attachTo  | $('body') | jQuery Selector | Where the elements of the walkthrough should be appended to. In some instances this may need to be altered. |

### Functions API
| Function               | Description                                                 |
|------------------------|-------------------------------------------------------------|
| d.boot();              | Calls on page load. Loads the styles and sets the defaults. |
| d.build(data,options); | Called when you wish to initiate a tour                     |
| d.next();              | Advances one step in the tour                               |
| d.close();             | Exits any opened tour                                       |

### Roadmap
I'd like to add more options such as previous steps, no jquery version and more! Please as always star if you like it and leave feedback! Thanks lovelies!
