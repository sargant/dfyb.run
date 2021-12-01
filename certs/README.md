# Certificates

**dfyb.run** requires a set of certificates in order to generate Apple Wallet passes - a _signer's key_, a _signer's certificate_,
and the _Apple Worldwide Developer Relations G1_ certificate. This application expects them in a specific encrypted format, saved
at `/certs.enc.json` at the root of the repository.

To generate the encrypted certificate file:
* Follow the steps in the [`passkit-generator` documentation](https://github.com/alexandercerutti/passkit-generator/wiki/Generating-Certificates)
  to generate `signerCert.pem`, `wwdr.pem`, and the signer's key, named `pass.run.dfyb.key`
* From the root of this repo, run `npm run encrypt-certs`, and make a note of the key.
* Delete the three original files, and check in the new `certs.enc.json` file.

At runtime, the application will expect the decryption key in the `SECRETS_KEY` environment variable.
