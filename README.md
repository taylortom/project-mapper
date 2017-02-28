# project-mapper

CLI tool to find internal projects.

## Configuration

Uses a json file specified in the package.json of this repository. This file must be an array of objects with the following structure:
```
{
  "name": "Project Name",
  "code": "NEW project code",
  "oldCode": "OLD project code"
}
```

## Usage

Look up project info using the old project code: `kpro map OLD_CODE`

Look up project by name `kpro find TEXT`
