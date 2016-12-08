const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')
const mysql = require('mysql')
const async = require('async')
const rootUrl = 'http://0day.ali213.net'
const limitNum = 5

// 数据库配置
const conn = mysql.createConnection({
  host: '121.42.164.99',
  user: 'root',
  password: 'liyiren158',
  database: 'games_youmin',
  port: 3306
})

conn.connect((err) => {
  if (err) {
    console.log('连接失败')
    return err
  }
  console.log('数据库连接成功')
})

// 创建写入数据sql
var addData = 'INSERT INTO games(name, eName, series, producter, distributer, time, summary, heat, gameUrl, imgUrl, youxiaPoint, youxiaPointPeople, IGNPoint, GameSpotPoint, FAMIPoint) VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

// 抓取的URL数组 共2139页
var pageUrls = []
for(let i = 1; i <= 2139; i++) {
  pageUrls.push(`http://0day.ali213.net/all/1-all-0-1999-0-0-td-${i}.html`)
}

// 计时
var t1 = new Date().getTime()

// 解析HTML
function filterChapter (html) {
  var $ = cheerio.load(html)

  // 读取游戏列表
  $('.ol_one').each(function (index) {
    // 操作DOM 查找数据
    let imgUrl = $(this).find('.ol_one_l_pic img').attr('src'),
        heat = parseInt($(this).find('.ol_one_l_pic em').text().substring(5)),
        name = $(this).find('.ol_one_c_tit a').text(),
        gameUrl = rootUrl + $(this).find('.ol_one_c_tit a').attr('href'),
        eName = $(this).find('.ol_one_c_etit').text(),
        series = $(this).find('.ol_one_c_nav li:nth-child(1)').text().split('：')[1],
        time = $(this).find('.ol_one_c_nav li:nth-child(2)').attr('title'),
        producter = $(this).find('.ol_one_c_nav li:nth-child(4)').text().substring(5).split('/')[0],
        distributer = $(this).find('.ol_one_c_nav li:nth-child(4)').text().substring(5).split('/')[1],
        summary = $(this).find('.ol_one_c_jj').text().split('[')[0],
        youxiaPoint = parseFloat($(this).find('.ol_one_r_pf').text()),
        youxiaPointPeople = parseInt($(this).find('.ol_one_r_rs').text()),
        IGNPoint = $(this).find('.ol_one_r_qtpf:nth-child(1) > span').text(),
        GameSpotPoint = $(this).find('.ol_one_r_qtpf:nth-child(2) > span').text(),
        FAMIPoint = $(this).find('.ol_one_r_qtpf:nth-child(3) > span').text()

    // 合成数组
    var game = [name, eName, series, producter, distributer, time, summary, heat, gameUrl, imgUrl, youxiaPoint, youxiaPointPeople, IGNPoint, GameSpotPoint, FAMIPoint]
  
    // 写入数据库
    conn.query(addData, game, (err, result) => {
      if (err) {
        console.log('INSERT ERROR' + err.message)
        return
      }
    })  
  })
}

// 发送请求
function requestUrl (pageUrl, callback) {
  request(pageUrl, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      filterChapter(body)
      callback(console.log(`加载成功 ${pageUrl}`))
    } else {
      console.log(`加载失败 ${pageUrl}`)
    }
  })
}

// 控制并发
async.mapLimit(pageUrls, limitNum, function (pageUrl, callback) {
  // setTimeout(function() {
    requestUrl(pageUrl, callback)
  // }, 1000);
}, function (err, result) {
  if (err) {
    console.log(err)
  } else {
    var t2 = new Date().getTime()
    console.log(`全部加载完毕! 用时 ${(t2-t1)/1000} 秒`)
  }
});
