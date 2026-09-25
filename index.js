const fs = require("fs");
const { PNG } = require("pngjs");

const outputDir = "./colors";

const size = {
	width: 1,
	height: 1
};

fs.mkdirSync(outputDir, { recursive: true });

function hexToRgba(hex) {
	hex = hex.replace("#", "");

	let r,
		g,
		b,
		a = 255;

	if (hex.length === 3) {
		r = parseInt(hex[0] + hex[0], 16);
		g = parseInt(hex[1] + hex[1], 16);
		b = parseInt(hex[2] + hex[2], 16);
	} else if (hex.length === 4) {
		r = parseInt(hex[0] + hex[0], 16);
		g = parseInt(hex[1] + hex[1], 16);
		b = parseInt(hex[2] + hex[2], 16);
		a = parseInt(hex[3] + hex[3], 16);
	} else if (hex.length === 6) {
		r = parseInt(hex.substring(0, 2), 16);
		g = parseInt(hex.substring(2, 4), 16);
		b = parseInt(hex.substring(4, 6), 16);
	} else if (hex.length === 8) {
		r = parseInt(hex.substring(0, 2), 16);
		g = parseInt(hex.substring(2, 4), 16);
		b = parseInt(hex.substring(4, 6), 16);
		a = parseInt(hex.substring(6, 8), 16);
	} else {
		throw new Error(`Formato hexadecimal inválido: #${hex}`);
	}

	return [r, g, b, a];
}

const hexColors = ["#A72320", "#A0221E", "#A72320CC", "#F008", "#fff"];

for (const hexColor of hexColors) {
	const [r, g, b, a] = hexToRgba(hexColor);

	const png = new PNG({ width: size.width, height: size.height });

	for (let y = 0; y < size.height; y++) {
		for (let x = 0; x < size.width; x++) {
			const idx = (size.width * y + x) * 4;
			png.data[idx] = r;
			png.data[idx + 1] = g;
			png.data[idx + 2] = b;
			png.data[idx + 3] = a;
		}
	}

	const filePath =
		`${outputDir}/` + hexColor.replace("#", "").toLowerCase() + ".png";

	const buffer = PNG.sync.write(png);
	fs.writeFileSync(filePath, buffer);

	console.log(
		`Imagem salva em ${filePath.replace(__dirname, ".")} (r=${r}, g=${g}, b=${b}, a=${a})`
	);
}
