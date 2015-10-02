$(function() {
  console.log( "ready!" );
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
  var chart = c3.generate({
      bindto: '#chart',

      axis: {
        y: {
            max: 7
           }
      },

      data: {

        axis: {
          x: {
             show: false
            }
        },

        xs: {
            'data_y': 'data_x'
        },

        x_data: 'data_x',
        y_data: 'data_y',

        columns: [
          x_points,
          y_points
        ]
      }
  })
});