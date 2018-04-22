var vsSource =
"attribute vec3 aVertexPosition;" +
"attribute vec4 aTextureCorrds;" +

"uniform mat4 uModelViewMatrix;" +
"uniform mat4 uProjectionMatrix;" +

"varying lowp vec4 vTextureCords;" +

"void main()" +
"{" +
	"gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);" +
	//"gl_Position = vec4(aVertexPosition, 1.0);" +
	//"gl_Position = vec4(0.0, 0.0, -1.0, 1.0);" +
	"vTextureCords = aTextureCorrds;" +
"}";

var fsSource =
"varying lowp vec4 vTextureCords;" +

"void main()" +
"{" +
	"gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" +
"}";
