import { HttpService, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }
  API_TWITTER_V1 = 'https://api.twitter.com/1.1';
  API_TWITTER_V2 = 'https://api.twitter.com/2';

  @Cron(new Date(Date.now() + 1000))
  async crawlUserInfo() {
    this.httpService.get(`${this.API_TWITTER_V1}/users/lookup.json?screen_name=${"realDonaldTrump"}`, {
      headers: {
        'Authorization' : 'Bearer AAAAAAAAAAAAAAAAAAAAAP6DHwEAAAAABD%2Bf%2F9Nsz%2F9YQimL9XpubnOe7M0%3DSmxxdZ6HjmR6reMjTo7tabCODLpda3B0eDCCVJE1hEEK26MZHZ'
      }
    }).subscribe(res => {
      if (res.data !== []) {
        const info = res.data[0];
        console.log('id', info.id);
        console.log('screenName', info.screen_name);
        console.log('description', info.description);
        console.log('followers_count', info.followers_count);
        console.log('following', info.friends_count);
        console.log('statuses_count', info.statuses_count);
        console.log('isVerify', info.verified);
        console.log('geo_enabled', info.geo_enabled);
      }

    });
  }

  @Cron(new Date(Date.now() + 2000))
  async crawlPost() {
    this.httpService.get(`${this.API_TWITTER_V2}/tweets/search/recent?query=from:${"realDonaldTrump"}`, {
      headers: {
        'Authorization' : 'Bearer AAAAAAAAAAAAAAAAAAAAAP6DHwEAAAAABD%2Bf%2F9Nsz%2F9YQimL9XpubnOe7M0%3DSmxxdZ6HjmR6reMjTo7tabCODLpda3B0eDCCVJE1hEEK26MZHZ'
      }
    }).subscribe(res => {
      if (res.data !== []) {
        res.data.data.forEach(item => {
          console.log(item.id, item.text);
        })
      }

    });
  }

}
