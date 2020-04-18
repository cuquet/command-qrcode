# Generate QR Code List Item Command View Set

## Summary

Generates a printable QR code which links to a SharePoint list item.

If no otem is selected, script capture list URL including metadat filters
Instead of printing lengthy SharePoint URLs that your users can't interact with, generate a QR code that will link them back to your SharePoint site.

![QR Code in Action](./assets/QRCode.gif)


![1.10.0](https://img.shields.io/badge/version-1.10.0-green.svg)

## Applies to

* [SharePoint Framework](https://dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`

## Features

This extension will generate a QR code for a selected list item. If no list items are selected, the extension will generate a QR code for the library with metadata filters

This extension illustrates the following concepts:

* Specifying an SVG icon for the list item command view icon
* Customizing the SVG icon at run-time
* Generating a QR code for a selection
* Downloading an SVG image as a PNG file
* Copying an image to the clipboard

## Original Solution

Solution|Author(s)
--------|---------
react-command-qrcode | Hugo Bernier ([Point Alliance](pointalliance.com), @bernierh)

## Version history

Version|Date|Comments
-------|----|--------
1.0|September 1, 2019|Initial release
2.0|April 11, 2020|Filter metadata, translations

## 2.0 Angel 11/04/2020
Cuando no se selecciona ningún fichero captura los filtros aplicados (según las columnas de metadatos y los incorpora a la URL de la biblioteca).
Añadidos idiomas (es-es, ca-es, pt-pt) para los botones de la ventada de dialogo

