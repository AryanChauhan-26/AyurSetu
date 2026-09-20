package gov.ayursetu.app.network;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ApiClient {
    // 10.0.2.2 is the standard loopback alias to host machine localhost in Android Emulator
    private static final String DEFAULT_BASE_URL = "http://10.0.2.2:5001/api/";
    private static String currentBaseUrl = DEFAULT_BASE_URL;

    private static Retrofit retrofit = null;
    private static AyurSetuApiService apiService = null;

    public static void setCustomBaseUrl(String url) {
        if (!url.endsWith("/")) {
            url += "/";
        }
        currentBaseUrl = url;
        retrofit = null;
        apiService = null;
    }

    public static String getBaseUrl() {
        return currentBaseUrl;
    }

    public static Retrofit getClient() {
        if (retrofit == null) {
            HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor();
            interceptor.setLevel(HttpLoggingInterceptor.Level.BODY);

            OkHttpClient client = new OkHttpClient.Builder()
                    .addInterceptor(interceptor)
                    .connectTimeout(15, TimeUnit.SECONDS)
                    .readTimeout(20, TimeUnit.SECONDS)
                    .writeTimeout(20, TimeUnit.SECONDS)
                    .build();

            retrofit = new Retrofit.Builder()
                    .baseUrl(currentBaseUrl)
                    .addConverterFactory(GsonConverterFactory.create())
                    .client(client)
                    .build();
        }
        return retrofit;
    }

    public static AyurSetuApiService getApiService() {
        if (apiService == null) {
            apiService = getClient().create(AyurSetuApiService.class);
        }
        return apiService;
    }
}
