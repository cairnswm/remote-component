import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';

function MicroFrontend(props) {
  const { host, name, history, containerId, fallback, options } = props;
  const [container, setContainer] = useState();
  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;

    const renderMicroFrontend = () => {
      if (container) {
        console.log("Render",name, `render${name}`, container, {...options})
        try {
          if (window[`render${name}`]) {
            window[`render${name}`](container, history, {...options});
          } else {
            console.error("Remote component does not exist")
          }
        } catch(err) {
          container.innerHTML = fallback;
        }
      }
    };

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then((res) => {console.log(host, res); return res.json()})
      .then((manifest) => {
        const script = document.createElement("script");
        script.id = scriptId;
        script.crossOrigin = "";
        script.src = `${host}${manifest.files["main.js"]}`;
        script.onload = () => {
          renderMicroFrontend();
        };
        document.head.appendChild(script);
      })
      .catch(err => {
        console.log(`Error fetching ${name}`,err)
        ReactDOM.render(
          fallback,
          document.getElementById(container),
        );
      })

    return () => {
      window[`unmount${name}`] && window[`unmount${name}`](container);
    };
  },[name, host, history, container, fallback, options]);

  useEffect(() => {
    let containerName;
    if (containerId) {
      containerName = containerId
    } else {
      console.log("Setting container by name",`${name}-container`)
      containerName = `${name}-container`;
    }
    if (!document.getElementById(containerName)) {
      console.log("Cannot find element",containerName)
      containerName = undefined;
    } 
    setContainer(containerName);
  },[containerId, name])
  
  return <span id={`${name}-container`} />;
}

MicroFrontend.defaultProps = {
  document,
  window,
};

export default MicroFrontend;
