$(function() {
  console.log( "ready!" );

  var parent_array = $('#charts_placeholder').data('parabolas');
  var all_parabolas = []

  for (index = 0; index < parent_array.length; ++index) {
    var x_points = [];
    var y_points = [];

    parent_array[index].forEach(function(entry) {
      
      for (var key in entry) {
        x_points.push(Number(Math.round(parseFloat(key)+'e2') +'e-2'));
        y_points.push(Number(Math.round(parseFloat(entry[key])+'e2') +'e-2'));
      }
    });

    all_parabolas[index] = [];
    copy_x_points = [];
    copy_y_points = [];
    all_parabolas[index].push(copy_x_points = x_points.slice(0));
    all_parabolas[index].push(copy_y_points = y_points.slice(0));

    drawChart(index, x_points, y_points);
  }
    
  drawMasterChart(all_parabolas);
});


function drawChart(index, x_points, y_points) {
  x_points.unshift('data_x');
  y_points.unshift('parabola');
  y_points.push(0)

  chart = c3.generate({

      bindto: '#chart_'.concat(index),

      axis: {
        y: {

            label: {
              text: 'Y axis',
              position: 'outer-middle' },
         
            show: true,
            tick: {
               fit: true,
              },
            padding : {
              top: 0,
              bottom : 20
            }
           },

        x: {

            show: true,
            label: {
                text: 'X axis',
                position: 'outer-center' },
            tick: {
              multiline: false,
              },
            }
      },

      data: {
        x: 'data_x',

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
    height: 1200,
    width: 1200
    });
  };


function drawMasterChart(all_parabolas) {

  //prepare the data for use in the chart

  for (index = 0; index < all_parabolas.length; ++index) {
    (all_parabolas[index])[0].unshift('x_points_'.concat(index));
    (all_parabolas[index])[1].unshift('y_points_'.concat(index));
  };

  var a = {}

  var b = []

  for (index = 0; index < all_parabolas.length; ++index) { 
    a['y_points_'.concat(index)] = 'x_points_'.concat(index);
    b.push((all_parabolas[index])[0]);
    b.push((all_parabolas[index])[1]);
     }

    chart = c3.generate({

      bindto: '#chart_all',

      axis: {
        y: {

            label: {
              text: 'Y axis',
              position: 'outer-middle' },        
            show: true,
            tick: {
               fit: true,
              },
            padding : {
              top: 0,
              bottom : 20
            }
           },

        x: {
            show: true,
            label: {
                text: 'X axis',
                position: 'outer-center' },
            tick: {
              multiline: false,
              },

            }
      },

      data: {

        xs: a,

        columns: b,
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
    height: 1200,
    width: 1200
    });
  };