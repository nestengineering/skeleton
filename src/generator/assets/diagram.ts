export const diagramHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>skeleton diagram</title>
    <style></style>
  </head>
  <body>
    <div id="app"></div>
    <script>
      const createDiagram = data => {
        const root = document.createElement('div');
        root.style.fontSize = '8pt';
        return entoryPoint(root, data);
      };

      const entoryPoint = (parent, data, first = true) => {
        parent.style.border = '1px solid';
        parent.style.boxShadow = '3px 3px 3px 3px rgba(0,0,0,0.5)';
        parent.style.margin = '10px';
        if (first) setProperty(parent, data);
        if (Array.isArray(data.children) && data.children.length !== 0) {
          data.children.forEach(child => {
            parent.appendChild(entoryPoint(createChild(child), child, false));
          });
        }
        return parent;
      };

      const createChild = child => {
        const childDom = document.createElement('div');
        setProperty(childDom, child);
        return childDom;
      };

      const setProperty = (dom, { name, state, props, methods }) => {
        const box = document.createElement('div');
        if (name) {
          const nameDom = document.createElement('div');
          nameDom.style.textAlign = 'center';
          nameDom.style.background = '#000';
          nameDom.style.color = '#fff';
          nameDom.style.width = '100px';
          nameDom.innerHTML =
            '<span style="color:#fd5e60; font-weight: bold;">name: </span><span style="white-space: pre">' +
            name +
            '</span>';
          box.appendChild(nameDom);
        }
        if (state) box.appendChild(createBlock('state', state));
        if (props) box.appendChild(createBlock('props', props));
        if (methods) box.appendChild(createBlock('methods', methods));
        dom.appendChild(box);
      };

      const getListFromObj = obj => {
        const ul = document.createElement('ul');
        ul.style.listStyle = 'none';
        ul.style.margin = '0';
        ul.style.paddingLeft = '15px';
        Object.entries(obj).forEach(entry => {
          const [key, value] = entry;
          const li = document.createElement('li');
          const keyDom = document.createElement('span');
          const valueDom = document.createElement('span');
          keyDom.innerHTML = '<span style="color:#a43161">' + key + '</span>:';
          valueDom.textContent = value;
          li.appendChild(keyDom);
          li.appendChild(valueDom);
          ul.appendChild(li);
        });
        return ul;
      };

      const formatData = (label, data) => {
        const span = document.createElement('span');
        const end = document.createElement('span');
        end.textContent = '}';
        span.textContent = label + ' {';
        span.appendChild(getListFromObj(data));
        span.appendChild(end);
        return span;
      };

      const createBlock = (label, data) => {
        const root = document.createElement('div');
        root.style.border = '1px solid #ddd';
        root.style.padding = '5px';
        root.style.margin = '5px';
        root.style.background = '#eee';
        root.appendChild(formatData(label, data));
        return root;
      };

      const data = 'SKELETON_DATA';

      document.getElementById('app').appendChild(createDiagram(data));
    </script>
  </body>
</html>
`
