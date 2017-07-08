import {Component, OnInit} from '@angular/core';
import {AdItem} from './ad-item';

import {AdService} from './ad.service';

@Component({
    selector: 'my-app',
    template: `
        <div>
            <ad-banner [ads]="ads"></ad-banner>
        </div>
    `
})
export class AppComponent implements OnInit {

    // AdItem - это пара:
    //      Тип компонента
    //      Данные компонента
    // Соответственно, и компоненты должны быть не абы какие, а поддерживающие некий интерфейс
    // Интерфейс этот - это AdComponent
    // Интерфейс это такой, что надо иметь публичное свойство data, которое можно установить, и которое можно считать
    // data - она произвольного формата, тут у компонентов есть свобода и гибкость
    // 
    // Таким образом, AdItem - это такая инструкция для создания компонентов, поддерживающих интерфейс AdComponent. 
    //
    // Вот. И здесь у нас как раз есть список таких инструкций для создания компонентов. 
    ads: AdItem[];

    constructor(private adService: AdService) {
    }

    ngOnInit() {

        // Этот список мы получаем из специального сервиса. 
        // Хотя, мы могли бы делать этот список прямо тут у себя. 
        this.ads = this.adService.getAds();
    }
}
