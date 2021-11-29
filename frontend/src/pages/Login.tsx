import React from 'react'
import { Formik, Field, Form } from 'formik'
import { useAuth } from '../lib/use-auth'
import { Redirect } from 'react-router-dom'
import Copyright from '../components/Copyright'
import { FacebookLoginButton, AmazonLoginButton, GoogleLoginButton } from 'react-social-login-buttons'
import { Button, FormControl, Container, Row, Toast, } from 'react-bootstrap'
import { FaUserNinja } from 'react-icons/fa'
interface Values {
  email: string
  password: string
}

const Login: React.FunctionComponent = () => {
  const { loggedIn, user, signin } = useAuth()
  const [open, setOpen] = React.useState(false)
  const [buttonClickable, setButtonClickable] = React.useState(false)

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  if (loggedIn) {
    const url = '/dashboard'
    return <Redirect to={url} />
  }

  const onsubmit = async (values: Values) => {
    const success = await signin(values.email, values.password)
    if (!success) {
      setOpen(true)
    }
  }

  const handleSocialLoginFailure = (err: any) => {
    console.log('scoial logi nerror', err)
  }

  const handleSocialLogin = (data: any) => {
    console.log('social login handeld ', data)
  }

  return (
    <Container >
      <div className="container">
        <FaUserNinja />
        <h1>
          User Login
        </h1>
        <Formik
          initialValues={{
            email: 'test@shop.at',
            password: 'Testtest1!',
          }}
          validate={(values) => {
            const errors: Partial<Values> = {}
            if (!values.email) {
              errors.email = 'Pflichtfeld'
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Keine gültige E-Mail Addresse'
            }
            // const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
            if (!values.password) {
              errors.password = 'Pflichtfeld'
            }
            // } else if (!regex.test(values.password)) {
            //   errors.password = 'Min 8 Zeichen + Sonderzeichen + Ziffer + Großbuchstabe'
            // }
            if (!errors.email && !errors.password) {
              setButtonClickable(true)
            } else {
              setButtonClickable(false)
            }
            return errors
          }}
          onSubmit={onsubmit}
        >
          <Form className="formovic">
            <Field
              //   component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-Mail Addresse"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <Field
              // component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Passwort"
              name="password"
              type="password"
            />

            {/* <FormControl

              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              disabled={!buttonClickable}
              color="primary"
              className="submit"
            >
              login
            </Button>
            <Container >
              <Row >
                <a href="/password-reset">
                  Forgot password?
                </a>
              </Row>
              <Row >
                <a href="/signup" >
                  {'No account? Register here!'}
                </a>
              </Row>
            </Container>
          </Form>
        </Formik>

        <h1 style={{ padding: "20px" }} >
          OR
        </h1>

        <FacebookLoginButton onClick={() => alert("Hello")} />
        <GoogleLoginButton onClick={() => alert("Hello")} />
        <AmazonLoginButton onClick={() => alert("Hello")} />
        {/* <SocialButton
          provider="google"
          appId="YOUR_APP_ID"
          fullWidth
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
        >
          Login with Google
        </SocialButton>

        <SocialButton
          provider="facebook"
          appId="YOUR_APP_ID"
          fullWidth
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
        >
          Login with Facebook
        </SocialButton>

        <SocialButton
          provider="amazon"
          appId="YOUR_APP_ID"
          fullWidth
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
        >
          Login with Amazon
        </SocialButton> */}

      </div>
      <Container >
        <Row>
          <Copyright />
        </Row>
      </Container>
      {
        open ?? <Toast>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Error</strong>
            <small>E-mail or password wrong</small>
          </Toast.Header>
          <Toast.Body></Toast.Body>
        </Toast>
      }
    </Container >
  )
}

export default Login
