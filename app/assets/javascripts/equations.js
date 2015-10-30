$(document).ready(function() {

if ($('#charts_placeholder').length != 0) {
  $(function() {

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
}


function drawChart(index, x_points, y_points) {
  x_points.unshift('data_x');
  y_points.unshift('parabola');
  //y_points.push(0)


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
        },

      tooltip: {
          format: {
              title: function (d) { return 'X axis: ' + d; },
              value: function (value, ratio, id, index) { return "Y axis: ".concat(value); }
  //            value: d3.format(',') // apply this format to both y and y2
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
        },

      tooltip: {
          format: {
              //name: function (name, ratio, id, index) { return name; },
              title: function (d) { return 'X axis value: ' + d; },
              //value: function (value, ratio, id) {
                  //var format = id === 'data1' ? d3.format('Y axis') : d3.format('Y axis');
                  //return format(value);
              value: function (value, ratio, id, index) { return "Y axis: ".concat(value); }
              
  //            value: d3.format(',') // apply this format to both y and y2
          }
      }      
    })

    chart.resize({
    height: 1200,
    width: 1200
    });
};

if ($('#form').length != 0) {
    collection = $( "input[name*='_value']" )

    for (index = 0; index < collection.length; ++index) {
      $(collection[index]).bind("input propertychange", function() {
        //-----------------------------------------------
          if (!(/^\-?[0-9]+(?:\.[0-9]+)?$/.test(this.value))) {
            //alert(this.value)
            $('#flash_placeholder').addClass('alert alert alert-danger')
            $('#flash_placeholder').text('Please, enter a numeric value');
            $("form[name=equation_form] input[name=commit]").prop('disabled', true); }

          if (((/^\-?[0-9]+(?:\.[0-9]+)?$/.test(collection[0].value))) && ((/^\-?[0-9]+(?:\.[0-9]+)?$/.test(collection[1].value))) && ((/^\-?[0-9]+(?:\.[0-9]+)?$/.test(collection[2].value)))) {
            $('#flash_placeholder').removeClass('alert alert alert-danger')
            $('#flash_placeholder').text('');
            $("form[name=equation_form] input[name=commit]").prop('disabled', false); }
        })
      }
}

})