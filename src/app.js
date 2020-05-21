import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import './index.css'
import './table.css'
import './input.css'

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.getDataSource(),
    }
}

coachDataSource=null; 

//  定义表结构
columns = [
  {
      title: "姓名",
      dataIndex: "name",
      key:"name",
  },
  {
      title: "年龄",
      dataIndex: "age",
      key:"age",
      textAglint:"right"
  },
  {
      title: "地址",
      dataIndex: "address",
      key:"address",
  },
  {
      title: "公司",
      dataIndex: "company",
      key:"company",
  },
]


getDataSource=()=>{


   let name1List=["张","李","孙","王","冯"];
   let name2List=["国","光","广","海","倍"];

   let dataSource=[];
   let i=0;
   while(i<20){
     
    let name1=name1List[(Math.floor(Math.random()*5))];
    let name2=name2List[(Math.floor(Math.random()*5))];
    let name3=name2List[(Math.floor(Math.random()*5))];
    dataSource.push({
        id:i,
        name: [name1,name2,name3].join(""),  // 3个以上建议用数组连接
        age: 20,
        address: `北京海淀区xxxx ${i}号楼`,  // es6 语法 
        company: "一汽",
    })
    i++;
   }

   this.coachDataSource=dataSource;
   return dataSource
}


  onSearch=(value)=>{
     console.log("value",value);
     if(value){
         const {dataSource}=this.state;
         let newDataSource=[];
         // 查询 name
         for(let item of dataSource){
              if(item.name.includes(value)){
                newDataSource.push(item);
              }
         }
         this.setState({dataSource:newDataSource});
     }else{
      const dataSource=this.coachDataSource;
      this.setState({dataSource});
     }
  }



   render(){

     return (
       <div>
         <div style={{
           textAlign:'center',
           marginTop:20,
           paddingBottom:20
         }}>
         <ReactInput 
           onSearch={this.onSearch}
           onClick={this.onSearch}
         />
         </div>
         <ReactTable dataSource={this.state.dataSource} columns={this.columns}/>
       </div>
     )
   }   
}


class ReactTable extends React.Component{
  
  constructor(props){
    super(props);

  }

 

  getTable = () => {
    const {collumns,dataSource} = this.props;   
    return (
         <table className="rc-table">
           {this.getHeadTable(collumns)}
           {this.getBodyTable(collumns,dataSource)}
         </table>
       )
  }

  getHeadTable = (collumns) => {
        return (
          <thead>
          <tr>
            {/* {collumns && Array.isArray(collumns) && collumns.map((item)=>{ */}
            {collumns && collumns.length>0 && collumns.map((item)=>{
              return (<th key={item.key} className="rc-table-thead-th">{item.title}</th>)
            })}
          </tr>
        </thead>
        )
  }

  getBodyTable = (collumns,dataSource) => {
       return (
         <tbody>
           
           {  dataSource && dataSource.length>0 && dataSource.map((item)=>{
                    return (
                        <tr key={item.id}>
                            {collumns.map((colItem)=>{
                            return ( <td key={colItem.key+item.id} className="rt-table-tbody-td">{item[colItem.dataIndex]}</td>)     
                            })}
                    </tr>
                    )
                })
                }
           
         </tbody>
       )
  }
  render(){
    return this.getTable();
  }
}

// ReactTable.protoTypes={
//   dataSource : PropTypes.array.isRequired,
//   collumns : PropTypes.array.isRequired
// }

ReactTable.defaultProps={
  dataSource : [],
  collumns : []
}



class ReactInput extends React.Component {


  constructor(props) {
      super(props);
      this.state = {
          value: "",
      }
  }



  onKeyDownEvent = (e) => {
      // 13 回车事件
      if (e.keyCode === 13) {
          const { onSearch } = this.props;
          const { value } = this.state;
          // 判断是否有 onSearch 回调函数
          if (onSearch) {
              onSearch(value);
          }
      }
  }


  onChangeEvent = (e) => {
      this.setState({ value: e.target.value })
  }

  onClickEvent = () => {
      const { value } = this.state;
      const {onClick}=this.props;
      // 判断是否有 onClick 回调函数
      if(onClick){
          onClick(value)
      }

  }


  render() {
      return (
          <span>
              <input
                  className="rt-input"
                  placeholder="请输入内容"
                  type="text"
                  value={this.state.value}
                  onKeyDown={this.onKeyDownEvent}
                  onChange={this.onChangeEvent}
              />
              <button
                  onClick={this.onClickEvent}
                  className="rt-input-search-btn"
              >
                  搜&nbsp;&nbsp;&nbsp;&nbsp;索
              </button>
          </span>
      )
  }
}


//  组件属性校验
// ReactInput.propTypes={
//   onSearch:propTypes.func,
//   onClick:propTypes.func,
// }

// ReactInput.propTypes={
//   onSearch :  PropTypes.func.isRequired,
//   onClick :   PropTypes.func.isRequired
// }
export {ReactTable, ReactInput};
export default App;