import {AfterViewInit, Component, ComponentFactoryResolver, Input, OnDestroy, ViewChild} from '@angular/core';
import {AdItem} from './ad-item';
import {AdComponent} from './ad.component';
import {AdDirective} from './ad.directive';

@Component({
    selector: 'ad-banner',
    template: `
        <div class="ad-banner">
            <h3>Advertisements</h3>
            
            <!--
            Создаем анкорный элемент DOM. С ним связаны контекст связывания с данными и контекст внедрения зависимостей.
            Также с этим элементом связаны TemplateRef, который в данном случае пустой, и мы его не используем. 
            Еще, с анкорным элементом связан ViewContainerRef, при помощи которого мы сможем выводить нужный нам
            динамически сгенерированный HTML, сразу после нашего анкорного комментария.
            
            Наша директива ad-host, все что делает - это добывает ViewContainerRef, 
            связанный с этим анкорным комментарием.
             
            Этот ViewContainerRef нам нужен здесь, в нашем этом компоненте. 
            -->
            <ng-template ad-host></ng-template>
            
        </div>
    `
})
export class AdBannerComponent implements AfterViewInit, OnDestroy {

    @Input()
    ads: AdItem[];

    currentAddIndex: number = -1;

    // Получаем пример директивы ad-host, связанный с анкорным комментарием, в нужном нам месте.
    // В этой директиве лежит нужный нам ViewContainerRef, связанный с этим анкорным комментарием,
    // находящимся в нужном нам месте.
    //
    // Анкорный комментарий находится как раз в том самом месте, куда мы хотим выводить динамически определяемые
    // компоненты.
    @ViewChild(AdDirective)
    adHost: AdDirective;

    interval: any;

    constructor(

        // Достаем получатель фабрики примеров компонентов любого класса компонентов, который есть в приложении
        private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngAfterViewInit() {
        this.loadComponent();
        this.setLoadComponentTimer();
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    loadComponent() {

        // Берем индекс следующего банера, по кругу
        this.currentAddIndex = (this.currentAddIndex + 1) % this.ads.length;

        // Берем очередную конфигурацию создания компонента
        let adItem = this.ads[this.currentAddIndex];

        // Достаем класс текущего компонента
        let ComponentClass = adItem.component;

        // По классу текущего компонента, получаем фабрику экземпляров этого класса компонентов
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ComponentClass);

        // Получаем ссылку ViewContainerRef, через которую можно рисовать компоненты на некотором конкретном месте
        let viewContainerRef = this.adHost.viewContainerRef;

        // Очищаем что там есть на данный момент
        viewContainerRef.clear();

        // Рисуем компонент на нужном месте, используя его фабрику, которую мы только что получили
        // Вообще, в этом методе параметров гораздо больше, но обязательным параметром является только фабрика
        // примеров компонента.
        let componentRef = viewContainerRef.createComponent(componentFactory);

        // Компонент создали, но данные в него еще не положили
        // Кладем туда данные
        (<AdComponent>componentRef.instance).data = adItem.data;
    }

    setLoadComponentTimer() {
        this.interval = setInterval(() => {
            this.loadComponent();
        }, 3000);
    }
}
