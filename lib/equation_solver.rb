class EquationSolver

  extend Math
  
  def self.calculate(a,b,c, status_array)
    if check_arguments(a, b, c) == false
      return false
    end

    a = a.to_f
    b = b.to_f
    c = c.to_f

    discriminant = find_discriminant(a, b, c)
    @vertex = find_vertex(a, b, c)
    case
      when discriminant < 0
        status_array << "Entered values for this parabola are #{a}, #{b}, #{c}. The discriminant of the equation is negative, there are no roots. The vertex of the parabola should be at the following co-ordinates: X axis at #{@vertex[0]}, Y axis at #{@vertex[1]}"

      when discriminant > 0
        x1 = (-b + sqrt(discriminant)) / 2*a
        x2 = (-b - sqrt(discriminant)) / 2*a

        status_array << "The discriminant of the equation is #{discriminant} and the values entered are #{a}, #{b}, #{c}. The roots of the equation are #{x1} and #{x2}. The vertex of the parabola should be at the following co-ordinates: X axis at #{@vertex[0]}, Y axis at #{@vertex[1]}"
      when discriminant == 0
        x1 = (-b + sqrt(discriminant)) / 2*a
        status_array << "The values entered are #{a}, #{b}, #{c}. The discriminant of the equation is #{discriminant}. The root of the equation is #{x1}. The vertex of the parabola should be at the following co-ordinates: X axis at #{@vertex[0]}, Y axis at #{@vertex[1]}"
    end
    @points = additional_points(a, b, c, @vertex)
  end

  private

  def self.check_arguments(a,b,c)
    if a == '0' || a == 0.0 || !numeric?(a) || !numeric?(b) || !numeric?(c)
      return false
    end
  end

  def self.find_discriminant(a, b, c)
    discriminant=(b*b)-(4*a*c)
  end

  def self.find_vertex(a, b, c)
    h = (-b)/(2*a)
    k = a*(h*h) + b*h + c
    [h, k]
  end

  def self.additional_points(a, b, c, vertex)
    coordinates = []
    #v_int = vertex.first.to_i
    ((vertex.first-15)..(vertex.first+15)).step(1).each do |x| x = x.round(2)
      y = (a*(x*x) + b*x + c).round(2)
      #y = (y * 1000).floor / 1000.0
      coordinates << {x => y}
    end
    coordinates
  end

  def self.numeric?(value)
    Float(value) != nil rescue false
  end

  def self.check_file_validity(file)
    begin
      CSV.parse(file).first
      true 
    rescue CSV::MalformedCSVError
      false
    end
  end

end