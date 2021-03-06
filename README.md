
Steps for installation:

Here is the website which has complete steps and explanation to install ionic framework.

In case the above doc is confusing, then I am summarizing the steps:

1. Install Node.js http://nodejs.org/ , click the download link and open the installer (.msi in Win, .dmg in Mac) to start installer
2. Install ionic by running the command in shell/Dos prompt  'npm install -g cordova ionic'
3. Make sure the github code CLMobile is available locally on your desktop, open the shell/Dos command prompt, and switch to directory one level inside the project directory, i.e. when you browse the directory you should see 'www'.
4. Once you are at the directory level, then run comand "ionic serve". It will start a browser automatically bringing up the running apps. Use your mouse to navigate.

Ionic App Base
=====================

A starting project for Ionic that optionally supports
using custom SCSS.

## Using this project

We recommend using the `ionic` utility to create new Ionic projects that are based on this project but use a ready-made starter template.

For example, to start a new Ionic project with the default tabs interface, make sure the `ionic` utility is installed:

```bash
$ sudo npm install -g ionic
```

Then run:

```bash
$ sudo npm install -g ionic
$ ionic start myProject tabs
```

More info on this can be found on the Ionic [Getting Started](http://ionicframework.com/getting-started) page.

## Installation

While we recommend using the `ionic` utility to create new Ionic projects, you can use this repo as a barebones starting point to your next Ionic app.

To use this project as is, first clone the repo from GitHub, then run:

```bash
$ cd ionic-app-base
$ sudo npm install -g cordova ionic gulp
$ npm install
$ gulp install
```

## Using Sass (optional)

This project makes it easy to use Sass (the SCSS syntax) in your projects. This enables you to override styles from Ionic, and benefit from
Sass's great features.

Just update the `./scss/ionic.app.scss` file, and run `gulp` or `gulp watch` to rebuild the CSS files for Ionic.

Note: if you choose to use the Sass method, make sure to remove the included `ionic.css` file in `index.html`, and then uncomment
the include to your `ionic.app.css` file which now contains all your Sass code and Ionic itself:

```html
<!-- IF using Sass (run gulp sass first), then remove the CSS include above
<link href="css/ionic.app.css" rel="stylesheet">
-->
```

## Updating Ionic

To update to a new version of Ionic, open bower.json and change the version listed there.

For example, to update from version `1.0.0-beta.4` to `1.0.0-beta.5`, open bower.json and change this:

```
"ionic": "driftyco/ionic-bower#1.0.0-beta.4"
```

To this:

```
"ionic": "driftyco/ionic-bower#1.0.0-beta.5"
```

After saving the update to bower.json file, run `gulp install`.

Alternatively, install bower globally with `npm install -g bower` and run `bower install`.

#### Using the Nightly Builds of Ionic

If you feel daring and want use the bleeding edge 'Nightly' version of Ionic, change the version of Ionic in your bower.json to this:

```
"ionic": "driftyco/ionic-bower#master"
```

Warning: the nightly version is not stable.

Installing Git
http://git-scm.com/book/en/v2/Getting-Started-Installing-Git



## Issues
Issues have been disabled on this repo, if you do find an issue or have a question consider posting it on the [Ionic Forum](http://forum.ionicframework.com/).  Or else if there is truly an error, follow our guidelines for [submitting an issue](http://ionicframework.com/contribute/#issues) to the main Ionic repository. On the other hand, pull requests are welcome here!

Other Plugin sites
https://github.com/Zikes/circle-menu
http://tympanus.net/codrops/2013/08/09/building-a-circular-navigation-with-css-transforms/
http://creative-punch.net/2014/02/making-animated-radial-menu-css3-javascript/
http://designshack.net/articles/css/code-a-spinning-circular-menu-with-css/

phone camera usage
http://blog.nraboy.com/2014/09/use-android-ios-camera-ionic-framework/
http://ngcordova.com/docs/#Camera


##iCloud Backup
When using localStorage in a mobile app that you intend to deploy to the Apple App Store, you must take into account iCloud storage and the iOS Data Storage Guidelines which suggest, among other things, that only data the user creates should be backed up to iCloud.

To make sure data stored in localStorage does not get backed up to iCloud and thus resulting in Apple rejecting your app for voilating the Data Storage Guidelines, make sure to set BackupWebStorage to none in your config.xml for Cordova/PhoneGap:

<!-- config.xml -->

<?xml version='1.0' encoding='utf-8'?>
<widget ...>
  <preference name="BackupWebStorage" value="none" />
</widget>

More detail check here : http://learn.ionicframework.com/formulas/localstorage/
https://docs.webplatform.org/wiki/apis/indexeddb

#Angular $StateProvider
https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-create-rules-to-prevent-access-to-a-state

#JPA Pagination link
http://wiki.eclipse.org/EclipseLink/Examples/JPA/Pagination 

#Spring-boot maven configuration for almost all libraries
https://github.com/spring-projects/spring-boot/blob/master/spring-boot-dependencies/pom.xml

#Angular Facebook integration
http://ccoenraets.github.io/ionic-tutorial/ionic-facebook-integration.html
https://github.com/ccoenraets/sociogram-angular-ionic


#HTTP Authentication and Interceptor
http://www.espeo.pl/1-authentication-in-angularjs-application/
http://witoldsz.github.io/angular-http-auth/
https://github.com/witoldsz/angular-http-auth
http://jasonwatmore.com/post/2014/05/26/AngularJS-Basic-HTTP-Authentication-Example.aspx


#Image Upload
http://forum.ionicframework.com/t/best-approach-to-resize-and-upload-images-to-server-cloud-image-processing-services/13694/4
http://cloudinary.com/
Amazon S3
https://calendee.com/2015/01/15/posting-images-to-cloudinary-in-ionic-apps/

#Creating custom iOS Camera plugin.
http://codrspace.com/vote539/writing-a-custom-camera-plugin-for-phonegap/

#CSS Media queries for Apple Devices
http://stephen.io/mediaqueries/#iPhone



