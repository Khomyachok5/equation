$(function() {
  console.log( "ready!" );

  var parent_array = $('#charts_placeholder').data('parabolas');
  // alert(parent_array.length);


  for (index = 0; index < parent_array.length; ++index) {
    var x_points = [];
    var y_points = [];

    //x_points.push('data_x');
    //y_points.push('data_y');


    //Object.keys(parent_array[index]).forEach(function(entry) { 
      //x_points.push(entry)
    // } );

    //alert(x_points);

    parent_array[index].forEach(function(entry) {
      
      for (var key in entry) {
        x_points.push(parseInt(key));
        y_points.push(parseInt(entry[key]))
      }
    });

    //alert(y_points);

    /*Object.values(parent_array[index]).forEach(function(entry) { 
      y_points.push(entry)
    } ); */

    //alert(y_points);
    drawChart(index, x_points, y_points)
  }
    
    

  //alert(x_points);


  /* for (index = 0; index < parent_array.length; ++index) {
    x_points.push(Object.keys(parent_array[index]));
  } */
  

  /*
  var x_points = [];
  var y_points = [];
  x_points.push('data_x', $('#vertex_x').data('x'))
  y_points.push('data_y', $('#vertex_y').data('y'))
  var index;
  var a =  Array.prototype.slice.call($('.element_name'), 0)
  for (index = 0; index < a.length; ++index) {
    x_points.push($(a[index]).data('x'));
  }
  var b =  Array.prototype.slice.call($('.element_y'), 0)
  for (index = 0; index < b.length; ++index) {
    y_points.push($(b[index]).data('y'));
  }

  */
});


function drawChart(index, x_points, y_points) { /* chart = */ 

  alert(typeof(parseInt(x_points[0])));

  x_points.unshift('data_x');
  y_points.unshift('data_y');

  alert(x_points);

  c3.generate({

      bindto: '#chart_'.concat(index),

      axis: {
        y: {
            show: true,
            tick: {
               count: 7,
               fit: true,
               values: y_points, 
              }, 
            padding: {
              top: 0,
              bottom: 0
              }
           },

        x: {
            show: true,
            tick: {
              count: 7,
              fit: true,
              values: x_points,
              outer: true
              },

            padding: {
              left: 1,
              right: 0,
              }
            }
      },

      data: {

        xs: {
            'data_y': 'data_x'
        },

        x_data: 'data_x',
        y_data: 'data_y',

        columns: [
          x_points,
          y_points
        ]
      },

        grid: {
            y: {
                  lines: [{value: 0, text: 'Y axis 0 value'}]
                },

            x: {
                  lines: [{value: 0, text: 'X axis 0 value'}]
                }
        }
    })

    //chart.resize({
    //height: 1400,
    //width: 1500
    //});
  };