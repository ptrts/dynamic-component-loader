import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AdBannerComponent} from './ad-banner.component';
import {AdDirective} from './ad.directive';
import {AdService} from './ad.service';
import {AppComponent} from './app.component';
import {HeroJobAdComponent} from './hero-job-ad.component';
import {HeroProfileComponent} from './hero-profile.component';

@NgModule({

    imports: [
        BrowserModule
    ],

    providers: [
        AdService
    ],

    declarations: [
        AppComponent,
        AdBannerComponent,
        HeroJobAdComponent,
        HeroProfileComponent,
        AdDirective
    ],

    // Ссылок на эти компоненты из шаблонов других компонентов нету, поэтому
    // мы указываем их здесь явно, чтоб ангуляр создал фабрики и для этих классов компонентов тоже
    entryComponents: [
        HeroJobAdComponent,
        HeroProfileComponent
    ],

    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
    constructor() {
    }
}
