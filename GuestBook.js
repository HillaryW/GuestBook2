Messages = new Mongo.Collection("messages");

Router.route('/', function () 
{
	this.render('guestBook'); // render guestbook template
	this.layout('layout'); // set main layout template
});


Router.route('/about', function () 
{
	this.render('about');
	this.layout('layout');
});

Router.route('/messages/:_id', function()
// to get :_id, go to Console and type Messages.find({}).fetch()
{
	this.render('messages', 
	{
		data: function () 
		{
			return Messages.findOne({_id: this.params._id});
		}
	});
	this.layout('layout');
},
// allows the messages to be clicked on in the main section, and brought up in localhost:3000/messages/....
{
	name: 'message.show'
}
);

if (Meteor.isClient) {
  
  Meteor.subscribe("messages");
  
  Template.guestBook.helpers( {
    "messages": function () {
      return Messages.find(
          {}, {sort: {createdOn: -1}} ) || {};
    } });
  
  Template.guestBook.events(
    {
        "submit form": function(event) {
            event.preventDefault();
            
            
            var messageBox =
                $(event.target).find('textarea[name=guestBookMessage]');
            var messageText = messageBox.val();
                
            var nameBox =
                $(event.target).find('input[name=guestName]');
            var nameText = nameBox.val();
            
            if (nameText.length > 0 && messageText.length > 0) {
              Messages.insert( {
                name: nameText, message: messageText, createdOn: Date.now()
              });
              
              
              nameBox.val(""); messageBox.val("");
            } else {
              //alert("Name and Message are both required");
              console.output(messageBox);
              messageBox.classlist.add("has-warning"); }
            
            


    
    } } );

  }

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
