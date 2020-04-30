<template>

<div class="marionette-wrapper">
    <div id="marionette-view"></div>
</div>

</template>

<script>
// import LinkView from 'modules/test/test_view.js'
// import MyView from 'modules/test/marionette_view.js'

export default {
    name: 'bbWrapper',
    props: [
        'mview'
    ],

    mounted: function() {
        let marionetteView = new this.mview({el: '#marionette-view'}).render();
        // var linkView = new LinkView({el: '#backbone-view'}).render();
  	    // var myView = new MyView({el: '#marionette-view'}).render();

        // These don't appear to be required...
        // $('#marionette-view').append(myView.$el);
  	    // $('#backbone-view').append(linkView.$el);
    }
}
</script>