# SUMZ Unternehmensbewertung - WebApp
Aufrufbar ist die WebApp über folgenden Link: https://github.com/UnderTheCraft/sumz-webapp/

## Technologien:
- React: https://github.com/facebook/create-react-app
- React-Bootstrap: https://react-bootstrap.github.io/
- Ant Design: https://ant.design/
- Ant Design Icons: https://ant.design/components/icon/
- Moment.js: https://momentjs.com/
- CanvasJS: https://canvasjs.com/html5-javascript-line-chart/

## Lokaler Start:
- Entwicklungsumgebung wie VisualStudio Code
- Node: https://nodejs.org/en/

## Befehle zum Ausführen:
- Zum installieren der notwendigen Libs etc.
```
npm install
```

- Zum starten der WebApp auf http://localhost:3000/
```
npm start
```


Bei jedem Commit wird die WebApp automatisch gebaut und auf dem Heroku Server deployed!


## Deployment bei Hoster:

Das Frontend sollte neben der lokalen Ausfürhung immer über das Internet erreichbar sein, weswegen ein Hoster verwendet wird.
Bisher wurde die Anwendung bei https://app.netlify.com deployed, da dort kostenloses Hosting verfügbar ist.

Um das Repository dort zu deployen wird ein Account bei Netlify benötigt.
Angemeldet muss eine neue App erstellt werden. Das Repository kann der App als Ressource zur Verfügung gestellt werden.
Das Deployment und Hosting wird anschließend automatisch durchgeführt. Die dabei erzeugte URL kann verwendet werden, um auf die WebApp zuzugreifen.
