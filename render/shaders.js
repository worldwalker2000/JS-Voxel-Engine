let vsSource =
"attribute vec3 aVertexPosition;" +
"attribute vec2 aTextureCorrds;" +

"uniform mat4 uModelViewMatrix;" +
"uniform mat4 uProjectionMatrix;" +

"varying lowp vec2 vTextureCords;" +

"void main()" +
"{" +
	"gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);" +
	//"gl_Position = vec4(aVertexPosition, 1.0);" +
	//"gl_Position = vec4(0.0, 0.0, -1.0, 1.0);" +
	"vTextureCords = aTextureCorrds;" +
"}";

let fsSource =
"varying lowp vec2 vTextureCords;" +

"void main()" +
"{" +
	"gl_FragColor = vec4(vTextureCords, 0.5, 1.0);" +
"}";
