package digithings.android.superfacil;

import android.os.Bundle;

import com.phonegap.*;
import com.beetight.barcodescanner.*;

public class SuperFacilMain extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}
