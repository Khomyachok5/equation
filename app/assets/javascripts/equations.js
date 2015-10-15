$(function() {
  console.log( "ready!" );

  var parent_array = $('#charts_placeholder').data('parabolas');
  // alert(parent_array.length);
  var all_parabolas = []


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
        //console.log(x_points);
      }
    });

    all_parabolas[index] = [];
    copy_x_points = [];
    copy_y_points = [];
    all_parabolas[index].push(copy_x_points = x_points.slice(0));
    all_parabolas[index].push(copy_y_points = y_points.slice(0));

    //Number(Math.round(1.005+'e2')+'e-2');

    //alert(y_points);

    /*Object.values(parent_array[index]).forEach(function(entry) { 
      y_points.push(entry)
    } ); */

    //alert(y_points);
    drawChart(index, x_points, y_points);

    
  }
    
  //console.log(all_parabolas)
  drawMasterChart(all_parabolas);
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
  y_points.unshift('parabola');
  y_points.push(0)
  //console.log("x_points array values")
  //console.log(x_points);
  //console.log("y_points array values")
  //console.log(y_points)

  //axis_x = [];
  //axis_y = [];
  //for (var i = -20; i <= 20; i++) {
    //axis_x.push(i);
    //axis_y.push(i);
  //}

  chart = c3.generate({

      bindto: '#chart_'.concat(index),

      axis: {
        y: {

            label: {
              text: 'Y axis',
              position: 'outer-middle' },
            //center: y_points[1],         
            show: true,
            tick: {
               fit: true,
               //values: y_points, 
              },
            padding : {
              top: 0,
              bottom : 20
            }
           },

        x: {
            //type: 'category',
            show: true,
            label: {
                text: 'X axis',
                position: 'outer-center' },
            tick: {
              //culling: {
                //max: 4 // the number of tick texts will be adjusted to less than this value
              //},
              multiline: false,
              //values: x_points,
              },

            }
      },

      data: {

        //xs: {
            //'data_y': 'data_x'
        //},

        x: 'data_x',
        //y: 'data_y',
        //parabola: 'parabola',
        //x_data: 'data_x',
        //y_data: 'data_y',

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

    //console.log("THE MODIFIED INDEX IS")
    //console.log((all_parabolas[index])[0])
  };

  //data_values_deps = (for (index = 0; index < all_parabolas.length; ++index) {
    //'data_y'.concat(index): 'data_x'.concat(index); })

  //console.log(data_values_deps)

  var a = {
          //'y_points_0': 'x_points_0',
          //'y_points_1': 'x_points_1',
          //'y_points_2': 'x_points_2',
          //if (typeof(all_parabolas[3]) != "undefined") {'y_points_3': 'x_points_3'}
        }

    var b = [
          //(all_parabolas[0])[0],
          //(all_parabolas[0])[1],
          //(all_parabolas[1])[0], //x_points_1,
          //(all_parabolas[1])[1], //y_points_1,
          //(all_parabolas[2])[0], //x_points_2,
          //(all_parabolas[2])[1]  //y_points_2
        ]

  for (index = 0; index < all_parabolas.length; ++index) { 
    a['y_points_'.concat(index)] = 'x_points_'.concat(index);
    b.push((all_parabolas[index])[0]);
    b.push((all_parabolas[index])[1]);
     }







//  /*
    chart = c3.generate({

      bindto: '#chart_all',

      axis: {
        y: {

            label: {
              text: 'Y axis',
              position: 'outer-middle' },
            //center: y_points[1],         
            show: true,
            tick: {
               fit: true,
               //values: y_points, 
              },
            padding : {
              top: 0,
              bottom : 20
            }
           },

        x: {
            //type: 'category',
            show: true,
            label: {
                text: 'X axis',
                position: 'outer-center' },
            tick: {
              //culling: {
                //max: 4 // the number of tick texts will be adjusted to less than this value
              //},
              multiline: false,
              //values: x_points,
              },

            }
      },

      data: {

        xs: a,

        //x: 'data_x',
        //y: 'data_y',
        //parabola: 'parabola',
        //x_data: 'data_x',
        //y_data: 'data_y',

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
//  */
  };