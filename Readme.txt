Here we use:
Use Database SQL Server.
Use MVC Application.
Use Entity Framework (Database First Approach).
Use AngularJS.
Use ASP.NET Web API.


Create database

Before we get started with IDE, let’s create a new database named “ProductDB” and create a sample table named “tblProduct”. The script is given belo:

USE [ProductDB]
GO

/****** Object:  Table [dbo].[tblProduct]    Script Date: 7/28/2018 12:53:23 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblProduct](
	[ProductID] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [nvarchar](50) NULL,
	[Category] [nvarchar](50) NULL,
	[Price] [money] NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_tblProduct] PRIMARY KEY CLUSTERED 
(
	[ProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


