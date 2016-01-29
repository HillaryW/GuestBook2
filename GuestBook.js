Messages = new Mongo.Collection("messages");


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
