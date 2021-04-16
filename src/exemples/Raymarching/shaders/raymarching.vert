precision lowp float;

attribute vec2 vertex;
uniform vec2 u_resolution;

// Projection matrix
uniform mat3 p_mat;

// Model matrix
uniform mat3 m_mat;

void main()
{
    vec3 position = p_mat * m_mat * vec3(vertex, 1);
    gl_Position = vec4(position, 1);
}