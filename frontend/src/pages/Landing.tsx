import React, { useRef } from 'react'
import { Container, Row, Button } from 'react-bootstrap'

function Copyright() {
  return (
    <h2 color="textSecondary">
      {'Copyright © CICEK.DIGITAL'}
      <a color="inherit" href="https:cicek.digital">
        Your Website
      </a>
      {new Date().getFullYear()}
      {'.'}
    </h2>
  )
}

const cards = [
  {
    key: 1,
    title: '1. Registrieren',
    img: 'images/home_login.jpg',
  },
  {
    key: 2,
    title: '2. QR-Code ausdrucken',
    img: 'images/home_printer1.jpg',
  },
  {
    key: 3,
    title: '3. Den Gästen servieren',
    img: 'images/home_qr.jpg',
  },
  {
    key: 4,
    title: '4. Daten abfragen',
    img: 'images/home_data.png',
  },
  {
    key: 5,
    title: '5. Zeit und Geld sparen',
    img: 'images/home_savemoney.jpg',
  },
]

const scrollToRef = (ref: any) => {
  console.log(ref.current.offsetTop)
  window.scrollTo(0, ref.current.offsetTop + 450)
}

export default function Album() {
  const myRef = useRef(null)
  const executeScroll = () => scrollToRef(myRef)

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <iframe width="664" height="350 "
          src="https://www.youtube.com/embed/LUetykHsxqQ?rel=0&amp;autoplay=1&mute=1&showinfo=0&controls=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
        <div>
          <Container >
            <h1
              color="textPrimary"
            >
              Welcome to VideoConsult
            </h1>
            <h5
              color="textSecondary"
            >
              VideoConsult is a tool to connect small business owner with customers with only one simple click!
            </h5>
            <div>
              <Container>
                <Row >
                  <Button variant="contained" href="/register" color="primary">
                    Registieren
                  </Button>
                </Row>
                <Row>

                  <Button variant="contained" href="/login" color="primary">
                    Login
                  </Button>
                </Row>
              </Container>
            </div>
            {/* <div className={classes.heroButtons}>
              <Grid container spacing={1} justifyContent="center">
                <Grid item>
                  <Button
                    ref={myRef}
                    onClick={executeScroll}
                    variant="outlined"
                    color="primary"
                  >
                    Wie funktioniert das?
                  </Button>
                </Grid>
              </Grid>
            </div> */}
          </Container>
          {/* End hero unit */}
        </div>

        {/* <div className={classes.image}></div> */}

        <div id="howto">
          <Container >
            <h3
              color="textPrimary"
            >
              Philosophie
            </h3>
            <h5>
              Die aktuelle Pandemie erschwert uns in jeder Hinsicht das tägliche
              Leben. Diese Plattform soll dem ohnehin stark angeschlagenen
              Dienstleistungssektor unter die Arme zu greifen. In nur einfachen
              Schritten setzen Sie Registro für Ihr Unternehmen ein!
            </h5>
          </Container>
        </div>

        {/* <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.key} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.img}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h4" component="h4">
                      {card.title}
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container> */}
      </main>
      {/* Footer */}
      <footer>
        <h6>
          Footer
        </h6>
        <p>
          Something here to give the footer a purpose!
        </p>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  )
}
