import { createGlobalState, useDark } from "@vueuse/core"

export const generateHTML = (payload: Record<string, any>, isDark?: boolean) => {
    return `<html class="${isDark ? 'dark' : ''}">
        <head>
            <style id="_style">${payload.css}</style>
            <script type="module" id="_script">
                ${payload.javascript}

                window.addEventListener('message', function(event) {
                    console.log(event)
                    if (event.data === 'theme-dark') {
                        document.documentElement.classList.add('dark')
                    } else if (event.data === 'theme-light') {
                        document.documentElement.classList.remove('dark')
                    }
                })
            </\script>
        </head>
        <body>
            ${payload.html}
        </body>
    </html`
}

export const useDarkGlobal = createGlobalState(
    () => useDark(),
)
  
export const initialEditorValue = {
    "html": "<h1>Welcome</h1><p>Edit The HTML,CSS,JS Files To See New Content Here</p>",
    "javascript": "",
    "css": ""
}

/**
 * Code Editor Helpers, 
 * Setting Inital Values
 * Handling The Tabs
 */