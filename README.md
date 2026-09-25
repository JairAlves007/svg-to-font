# create-color-1px

Gera arquivos PNG de 1x1 pixel a partir de cores em hexadecimal, usando [`pngjs`](https://github.com/lukeapage/pngjs).

Útil para criar placeholders, favicons, pixels de rastreamento ou amostras de cor (swatches) com alfa customizado.

## Requisitos

- [Node.js](https://nodejs.org) (CommonJS)

## Instalação

```bash
npm install
```

## Uso

```bash
npm run service
```

Ou diretamente:

```bash
node index.js
```

## Como funciona

1. A pasta `./colors` é criada automaticamente caso não exista.
2. Cada cor da lista `hexColors` em `index.js:46` é convertida de hexadecimal para RGBA pela função `hexToRgba` (`index.js:13`).
3. Um PNG de 1x1 pixel é preenchido com o RGBA resultante e gravado em `./colors/<hex>.png` (nome sempre em minúsculas, sem o `#`).
4. O caminho do arquivo gerado e os canais RGBA são exibidos no console.

## Formatos aceitos

`hexToRgba` suporta quatro notações:

| Formato   | Exemplo     | Resultado                        |
| --------- | ----------- | -------------------------------- |
| 3 dígitos | `#fff`      | R255 G255 B255 A255               |
| 4 dígitos | `#f008`     | R255 G0 B0 A136 (alfa duplicado)  |
| 6 dígitos | `#a72320`   | R167 G35 B32 A255                |
| 8 dígitos | `#a72320cc` | R167 G35 B32 A204 (alfa = `0xCC`) |

Caso contrário, lança `Formato hexadecimal inválido: #<hex>`.

## Personalização

Edite a lista em `index.js:46` com as cores desejadas:

```js
const hexColors = ["#A72320", "#A72320CC", "#fff"];
```

Para gerar arquivos maiores, ajuste `size` em `index.js:6` — a lógica de escrita dos pixels já é genérica para qualquer largura e altura:

```js
const size = {
	width: 1,
	height: 1
};
```

## Saída de exemplo

```
Imagem salva em ./colors/a72320.png (r=167, g=35, b=32, a=255)
Imagem salva em ./colors/a72320cc.png (r=167, g=35, b=32, a=204)
Imagem salva em ./colors/fff.png (r=255, g=255, b=255, a=255)
```

> As imagens geradas em `colors/` estão no `.gitignore` e não são versionadas.

## Licença

MIT
