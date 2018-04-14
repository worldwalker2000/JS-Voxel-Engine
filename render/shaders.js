var vsSource =
"attribute vec4 aVertexPosition;" +
"attribute vec4 aTextureCorrds;" +

"uniform mat4 uModelViewMatrix;" +
"uniform mat4 uProjectionMatrix;" +

"varying lowp vec4 vTextureCords;" +

"void main()" +
"{" +
	"gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;" +
	"vColor = aVertexColor;" +
"}";

var fsSource =
"varying lowp vec4 vTextureCords;" +

"void main()" +
"{" +
	"gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" +
"}";
