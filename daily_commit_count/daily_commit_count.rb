# -*- coding: utf-8 -*-

require 'rubygems'
require 'twitter'
require 'pp'

GIT_REPO_DIR = 'GIT REPOSITORY PATH'

def count_commit(from ,to)
  output = `git --git-dir #{GIT_REPO_DIR} --no-pager log --date=iso --pretty=format:'%ad'`
  time_array = []
  output.each_line do |line|
    time_array.push(Time.parse(line))
  end

  {
    :range => time_array.select{|tm| from <= tm && tm < to }.size,
    :all   => time_array.size
  }
end  

Twitter.configure do |config|
  config.consumer_key = 'CONSUMER KEY'
  config.consumer_secret = 'CONSUMER SECRET'
  config.oauth_token = 'OAUTH TOKEN'
  config.oauth_token_secret = 'OAUTH TOKEN SECRET'
end

now = Time.now
from = Time.local(now.year, now.month, now.day) - 24*60*60

count = count_commit(from, from+24*60*60)
Twitter.update("#{from.strftime("%m月%d日")}のコミット数 : #{count[:range]} (通算#{count[:all]})")
