package com.awesomeproject;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.horcrux.svg.RNSvgPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.imagepicker.ImagePickerPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.magus.fblogin.FacebookLoginPackage; 
import com.brentvatne.react.ReactVideoPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage; 
import com.burnweb.rnsendintent.RNSendIntentPackage;

import com.psykar.cookiemanager.CookieManagerPackage;
import com.auth0.lock.react.LockReactPackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BackgroundTimerPackage(),
            new RNSvgPackage(),
            new VectorIconsPackage(),
            new ImagePickerPackage(),
            new ReactMaterialKitPackage(),
          new FacebookLoginPackage(),
          new ReactVideoPackage(),
          new CookieManagerPackage(),
          new RNSendIntentPackage(),
          new ReactNativePushNotificationPackage(),
          new LockReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
