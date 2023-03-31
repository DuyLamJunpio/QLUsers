import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, View, RefreshControl, SafeAreaView, Text, Image ,Button} from 'react-native';
import styles from './components/MyStyles';
import React, { useState, useEffect } from 'react';
import ModalAdd from './components/Modal';

export default function App() {
  const [isReloading, setisReloading] = useState(false)
  const [counter, setcounter] = useState(dem);
  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState([]);

  var dem = 0;

  const reloadData = React.useCallback(
    () => {
      // đánh dấu trạng thái đang reload để hiển thị quay quay
      setisReloading(true);
      // các công việc xử lý load lại dữ liệu viết ở dưới đây
      dem++;
      setcounter(dem);

      getData()

    }

  );
  
  

  useEffect(() => {
    getData();
  })

  const getData = async () => {
    let url_api = 'http://44.168.0.102:3000/userData';

    try {
      const response = await fetch(url_api);  // lấy dữ liệu về
      const jsonSP = await response.json(); // chuyển dữ liệu thành đối tượng json
      setData(jsonSP);
    } catch (error) {
      console.error(error);
    } finally {
      // kết thúc quá trình thực hiện trong try, dù xảy ra lỗi hay không cũng gọi vào đây
      // đổi trạng thái isLoading là false
      setisLoading(false);
      setisReloading(false);

    }
  }

  const renderData = ({ item }) => {


    return (

      <View style={styles.danhsach}>
        <Image style={styles.image} source={{ uri: item.image }} />
        <Text style={styles.item}>Username: {item.username}</Text>
        <Text style={styles.item}>Password: {item.password}</Text>
        <Text style={styles.item}>Fullname: {item.fullname}</Text>
        <Text style={styles.item}>Email: {item.email}</Text>
      </View>

    );

  }


  return ( 
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <ModalAdd/>
        {
          (isLoading) ? (
            <ActivityIndicator />
          ) : (

            <FlatList

              refreshControl={
                <RefreshControl refreshing={isReloading}
                  onRefresh={reloadData} />
              }

              data={data}
              keyExtractor={(item) => { return item.id }}
              renderItem={renderData}
            />
          )

        }

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
