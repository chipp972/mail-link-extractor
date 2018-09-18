import {initGoogleAuth} from './google_auth';

describe('lib google auth', () => {
  it('should init google auth with the passed factory', () => {
    const spy = jest.fn(() => { test: 'test' })
    const test = initGoogleAuth({
      clientId: 'id',
      clientSecret: 'secret',
      redirectUrl: 'url',
      oauth2ClientFactory: spy
    })
    expect(test).toEqual(spy.mock.instances[0])
    expect(spy).toHaveBeenCalledWith('id', 'secret', 'url')
  })

})
