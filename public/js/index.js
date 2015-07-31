//jQuery.ajax
$(function(){
  'use strict';
  var gameWatcher;

  //  var sa = '//localhost:3000';
  var sa = '//localhost:3000';

  $('#register').on('click', function(e){
    $.ajax(sa + '/users', {
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        credentials: {
          email: $('#email').val(),
          password: $('#password').val(),
          password_confirmation: $('#password').val()
        }
      }),
      dataType: 'json',
      method: 'POST'
      //see api.jquery documentation online for meanings of all of these
    }).done(function(data,textStatus,jqxhr){
      $('#result').val(JSON.stringify(data));
    }).fail(function(jqxhr, textStatus, errorThrown){
      $('#result').val('registration failed');
    })
  });
  $('#login').on('click', function(e){
    $.ajax(sa + '/login', {
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        credentials: {
          email: $("#email").val(),
          password: $("#password").val()
        }
      }),
      dataType: 'json',
      method: 'POST'
    }).done(function(data){
      $("#token").val(data.token);
    }).fail(function(e){
      $('#result').val('login failed');
    });
  });
    $('#list').on('click', function(e){
    $.ajax(sa + '/users', {
      dataType: 'json',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + $("#token").val()
      }
    }).done(function(data){
      $("#result").val(JSON.stringify(data));
    }).fail(function(){
      $("#result").val('list failed');
    });
  });
  $('#show').on('click', function(e){
    $.ajax(sa + '/games/' + $('#id').val(), {
      //adds slash after game, plus value of id column
      dataType: 'json',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + $("#token").val()
      }
    }).done(function(data){
      $("#result").val(JSON.stringify(data));
    }).fail(function(){
      $("#result").val('list failed');
    });
  });
  $('#create').on('click', function(e) {
    $.ajax(sa + '/games', {
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({}),
      dataType: 'json',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + $('#token').val()
      }
    }).done(function(data, textStatus, jqxhr){
      $('#result').val(JSON.stringify(data));
    }).fail(function(jqxhr, textStatus, errorThrown){
      $('#result').val('create failed');
    });
  });
  $('#join').on('click', function(e) {
    //copies #create and adds ID on the end (like from create)
    $.ajax(sa + '/games/' + $('#id').val(), {
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({}),
      dataType: 'json',
      //changes method to PATCH, instead of player_o null, they will be assigned.
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + $('#token').val()
      }
    }).done(function(data, textStatus, jqxhr){
      $('#result').val(JSON.stringify(data));
    }).fail(function(jqxhr, textStatus, errorThrown){
      $('#result').val('join failed');
    });
  });
  $('#move').on('click', function(e) {
    //copies #join except for data sent
    $.ajax(sa + '/games/' + $('#id').val(), {
      contentType: 'application/json',
      processData: false,
      //adds game object containing cell object
      data: JSON.stringify({
        game: {
          cell: {
            //unary plus operator turns string to number
            index: +$('#index').val(),
            value: $('#value').val()
          }
        }
      }),
      dataType: 'json',
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + $('#token').val()
      }
    }).done(function(data, textStatus, jqxhr){
      $('#result').val(JSON.stringify(data));
    }).fail(function(jqxhr, textStatus, errorThrown){
      $('#result').val('move failed');
    });
  });

  $("#watch").on('click', function(){
    gameWatcher = resourceWatcher(sa + '/games/' + $('#id').val() + '/watch', {
      Authorization: 'Token token=' + $('#token').val()
    });
    gameWatcher.on('change', function(data){
      var parsedData = JSON.parse(data);
      //heroku routers report this as 503
      // if (data.timeout) {
      //   gameWatcher.close();
      //   return console.warn(data.timeout);
      // }
      var gameData = parsedData.game;
      var cell = gameData.cell;
      $('#index').val(cell.index);
      $('#value').val(cell.value);
    })
    gameWatcher.on('error', function(e){
      console.error('an error has occurred', e);
    })
  })
});
