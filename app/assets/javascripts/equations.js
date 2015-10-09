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
        x_points.push(Number(Math.round(parseFloat(key)+'e2') +'e-2'));
        y_points.push(Number(Math.round(parseFloat(entry[key])+'e2') +'e-2'));
        //y_points.push(parseFloat(entry[key]))
      }
    });

    //Number(Math.round(1.005+'e2')+'e-2');

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

  x_points.unshift('data_x');
  y_points.unshift('data_y');
  y_points.push(0)
  //alert(y_points)

  axis_x = [];
  axis_y = [];
  for (var i = -20; i <= 20; i++) {
    axis_x.push(i);
    axis_y.push(i);
  }

  chart = c3.generate({

      bindto: '#chart_'.concat(index),

      axis: {
        y: {
            //center: y_points[1],         
            show: true,
            tick: {
               fit: true,
               values: y_points, 
              },
            padding : {
              top: 0,
              bottom : 20
            }
           },

        x: {
            type: 'category',
            show: true,
            tick: {
              culling: {
                max: 4 // the number of tick texts will be adjusted to less than this value
              },
              multiline: false,
              values: x_points,
              },

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
        ],
        type: 'spline'
      },

        grid: {
            y: {
                  lines: [{value: 0, text: 'X axis 0 value', position: 'start'}]
                },

            x: {
                  lines: [{value: 0, text: 'Y axis 0 value',  position: 'start'}]
                }
        }
    })

    chart.resize({
    height: 1400,
    width: 1500
    });
  };