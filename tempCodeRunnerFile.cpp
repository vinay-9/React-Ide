        #include<bits/stdc++.h>
    #include<stdlib.h>

    using namespace std;
    typedef long long ll;
    struct point{
        int position, weight, id;
    };
    int main(){
        ios_base::sync_with_stdio(false);
        cin.tie(nullptr);
        int t;
        cin>> t;
        while(t--){
            vector<int> candies;
            int n;
            cin>> n;
            for(int i=0, x; i< n; i++){
                cin>> x;
                candies[i] = x;
            }
            sort(candies.begin(), candies.end());
            if(n==1) {if(candies[0] > 1)cout<<"NO"<<endl;
            else cout<<"YES"<<endl;
            continue;}
            if(candies[0] == candies[n-1]) cout<< "NO"<<endl;
            else cout<< "YES"<<endl;
        }
        
        return 0;
    }
