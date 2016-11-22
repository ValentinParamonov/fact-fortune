Fact Fortune
============

### Store [FactSlides][1] facts as a [fortune][2] file

#### Prerequisites
* [Yarn][3]
* [Node][4]
* [Docker][5]

#### Run [RethinkDB][6] container
```
docker run -d -p 8080:8080 -p 28015:28015 --name rethinkdb rethinkdb
```
#### Install
```
yarn install
```
#### Run update script
```
./update-fortune.sh
```

[1]: http://factslides.com
[2]: https://en.wikipedia.org/wiki/Fortune_(Unix)
[3]: https://yarnpkg.com
[4]: https://nodejs.org
[5]: https://www.docker.com
[6]: https://rethinkdb.com

