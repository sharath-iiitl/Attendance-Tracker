import "./table.css"

const color = (e, status) => {
      if(status == 'p') {
        const id = 'a' + e.target.id[1];
        const a = document.getElementById(id);
        if(a.style.backgroundColor == "red") {
          a.style.backgroundColor = "white";
          a.style.color = "red";
        }
      if (e.target.style.backgroundColor == "" || e.target.style.backgroundColor == "white") {
      e.target.style.backgroundColor = "green"
      e.target.style.color = "white" }
      else if (e.target.style.backgroundColor == "green") {
        e.target.style.backgroundColor = "white"
        e.target.style.color = "green" }
    }
      else {
        const id = 'p' + e.target.id[1];
        const p = document.getElementById(id);
        if(p.style.backgroundColor == "green") {
          p.style.backgroundColor = "white";
          p.style.color = "green";
        }
        if (e.target.style.backgroundColor == "" || e.target.style.backgroundColor == "white") {
          e.target.style.backgroundColor = "red"
          e.target.style.color = "white" }
        else if (e.target.style.backgroundColor == "red") {
            e.target.style.backgroundColor = "white"
            e.target.style.color = "red" }
      }
}

export const userColumns = [
    { field: "id", headerName: "Student Id", flex : 1,
    renderCell: (params) => {
      {
        var prefix = "L" + params.row.branch + params.row.batch
        if(params.row.id < 10) {
        return (
          <div className="cellWithImg">
            <label className="label">{prefix + "00" + params.row.id}</label>
          </div>
        );
      }
      else {
        return (
          <div className="cellWithImg">
            <label className="label">{prefix + "0" + params.row.id}</label>
          </div>
        );
      }
    }
    }
  },
    {
      field: "name",
      headerName: "Name",
      flex : 1,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.row.name}
          </div>
        );
      },
    },
    // {
    //   field: "branch",
    //   headerName: "Branch",
    //   width: 250,
    // },
    {
      field: "action",
      headerName: "Action",
      flex : 1,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="presentButton" id={`p${params.row.id}`} onClick={(e) => {color(e, 'p')}} style={{color : "green", borderColor : "green"}}>Present</div>
            <div className="absentButton" id={`a${params.row.id}`} onClick={(e) => {color(e, 'a')}}>Absent</div>
          </div>
        );
      },
    }
  ];
  
