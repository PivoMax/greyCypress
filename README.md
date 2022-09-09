# com.grey.www

# Development Setup

## Node version

The project setup required to point to node version `17.8.0`.

To set up the needed node version, run `nvm use` and then locally run `nvm install 17.8.0` if not installed already.

### Content Model Migrations

To pull content model as code from the environment and spaceId mentioned in .env, run:

```bash
yarn run contentful:pull -- --include=textBlock
# yarn run contentful:pull -- --include=all # or --include=<your-model-name>
```
If the above command fails, run:
```
cd scripts/contentful; yarn; cd ../../;
```

If you want to push your pulled content model or whatever is in code, run:
**Warn: change environment to the desired push environment in .env**
```bash
yarn run contentful:push -- --include=textBlock
# yarn run contentful:push -- --include=all # or --include=<your-model-name>
```
If there are errors pushing, you may have deleted certain fields for your content models. Please manually go and disable in edit and response for that field on the target push env.
**Remember to revert your env back**
You can also set diff env like this:

```
CONTENT_ENV=next yarn run contentful:pull -- --include=all
```

## Configuration

We need to create a `.env` file with the required variables to run locally.
For now, we can copy content from the `env.local` file to the `.env` file.
