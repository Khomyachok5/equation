class EquationsController < ApplicationController
  include Math
  def main_page
  end

  def calculate
    a = params[:a_value].to_i
    b = params[:b_value].to_i
    c = params[:c_value].to_i
    discriminant = find_discriminant(a, b, c)
    if discriminant < 0
      @answer =  "The discriminant of the equation is negative, there are no roots"
    else
      @vertex = find_vertex(a, b, c)
      case
        when discriminant > 0
          x1 = (-b + sqrt(discriminant)) / 2*a
          x2 = (-b - sqrt(discriminant)) / 2*a
          @answer =  "THE DISCRIMINANT OF THE EQUATION IS #{discriminant} and the values entered are #{a}, #{b}, #{c}. The roots of the equation are #{x1} and #{x2}. The vertex of the parabola should be at the following co-ordinates: X axis at #{@vertex[0]}, Y axis at #{@vertex[1]}"
        when discriminant == 0
          x1 = (-b + sqrt(discriminant)) / 2*a
          @answer =  "THE DISCRIMINANT OF THE EQUATION IS #{discriminant} and the values entered are #{a}, #{b}, #{c}. The root of the equation is #{x1}. The vertex of the parabola should be at the following co-ordinates: X axis at #{@vertex[0]}, Y axis at #{@vertex[1]}"
      end
      @points = additional_points(a, b, c, @vertex)
    end
  end

  def find_discriminant(a, b, c)
    discriminant=(b*b)-(4*a*c)
  end

  def find_vertex(a, b, c)
    h = -b/(2*a)
    k = a*(h*h) + b*h + c
    [h, k]
  end

  def additional_points(a, b, c, vertex)
    coordinates = []
    (vertex.first-5).upto(vertex.first+7) do |x|
      y = a*(x*x) + b*x + c
      coordinates << {x => y}
    end
    coordinates
  end
end
