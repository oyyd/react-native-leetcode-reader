import { BG_COLOR, MAIN_COLOR, } from '../style';

function injectTemplate(content) {
  return `
    <html>
      <head>
        <style>
          code {
            color: #c7254e;
          }
          b, strong {
            font-weight: 700;
          }
          pre {
            background-color: #f5f5f5;
            border: 1px solid #ccc;
            padding: 5px;
            border-radius: 5px;
          }
          a {
            text-decoration: none;
            color: ${MAIN_COLOR};
          }
          blockquote {
            border-left: 2px solid #999;
            margin-left: 10px;
            padding-left: 10px;
          }
          .hide {
            display: none;
          }
        </style>
      </head>
      <body style="background-color: ${BG_COLOR};margin:0;padding:0;">
        <div id="content" style="margin:0;padding:0;">${content}</div>
        <script>
          (function () {
            var contentEle = document.getElementById('content'),
              i = 0;

            function updateHeight () {
              document.title = contentEle.clientHeight;
              window.location.hash = ++i;
            }

            updateHeight();

            window.addEventListener('load', updateHeight);
            window.addEventListener('resize', updateHeight);
          })();
        </script>
      </body>
    </html>
  `;
}

export default function composeWebViewContent(content) {
  // TODO:
  let res = injectTemplate(content);
  return res;
};
