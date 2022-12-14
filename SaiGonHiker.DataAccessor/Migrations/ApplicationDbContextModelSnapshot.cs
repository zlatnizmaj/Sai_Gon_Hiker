// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SaiGonHiker.DataAccessor.Data;

namespace SaiGonHiker.DataAccessor.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.6")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ConcurrencyStamp = "561387a6-2c97-483c-8fbb-2ad4ffc2c698",
                            Name = "Admin",
                            NormalizedName = "ADMIN"
                        },
                        new
                        {
                            Id = 2,
                            ConcurrencyStamp = "ab4eaf56-321e-4e30-9393-3d2c87f5bd8a",
                            Name = "User",
                            NormalizedName = "USER"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("RoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("UserRoles");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            RoleId = 1
                        },
                        new
                        {
                            UserId = 2,
                            RoleId = 2
                        },
                        new
                        {
                            UserId = 3,
                            RoleId = 2
                        },
                        new
                        {
                            UserId = 4,
                            RoleId = 2
                        },
                        new
                        {
                            UserId = 5,
                            RoleId = 2
                        },
                        new
                        {
                            UserId = 6,
                            RoleId = 2
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("SaiGonHiker.DataAccessor.Entities.Users", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDisabled")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AccessFailedCount = 0,
                            Address = "Binh Chanh District, HCM City",
                            ConcurrencyStamp = "3732a6ab-9e47-438c-9f5d-61a402a0e084",
                            Email = "minhquan2122000@gmail.com",
                            EmailConfirmed = false,
                            FullName = "Quan Tran",
                            Gender = "Male",
                            IsDisabled = false,
                            LockoutEnabled = false,
                            PasswordHash = "AQAAAAEAACcQAAAAEJT5jSW3kJ+d4LNGoFNY0P/oWPrL0Qb5HoAhnI5cDaCwTpcx4p8fjxEOuj7PNcSlxQ==",
                            PhoneNumber = "0924721184",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserCode = "U0001",
                            UserName = "quant"
                        },
                        new
                        {
                            Id = 2,
                            AccessFailedCount = 0,
                            Address = "District 9, HCM City",
                            ConcurrencyStamp = "a86fea7f-32ed-4cdc-9dbd-8d360bfd84c2",
                            Email = "khanh2122000@gmail.com",
                            EmailConfirmed = false,
                            FullName = "Khanh Tran",
                            Gender = "Female",
                            IsDisabled = false,
                            LockoutEnabled = false,
                            PasswordHash = "AQAAAAEAACcQAAAAEBirsZxBoMVdFl43HKA3g07M8LP8s+1y0P0fHnqdbLYEc4FEEPBmxabUEuGtqPc9wg==",
                            PhoneNumber = "0924721184",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserCode = "U0002",
                            UserName = "khanht"
                        },
                        new
                        {
                            Id = 3,
                            AccessFailedCount = 0,
                            Address = "District 5, HCM City",
                            ConcurrencyStamp = "cae45f2a-b256-4df3-8920-986aef37ae6f",
                            Email = "hoang123@gmail.com",
                            EmailConfirmed = false,
                            FullName = "Hoang Nguyen",
                            Gender = "Male",
                            IsDisabled = false,
                            LockoutEnabled = false,
                            PasswordHash = "AQAAAAEAACcQAAAAEFGgodikcBSWaVnINDABF5pMjs7m53moY+zkF2h2IltvzvRKjsDEJ4JciiQpFO6s+A==",
                            PhoneNumber = "0924721184",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserCode = "U0003",
                            UserName = "hoangnguyen"
                        },
                        new
                        {
                            Id = 4,
                            AccessFailedCount = 0,
                            Address = "District 7, HCM City",
                            ConcurrencyStamp = "0788a4ef-97d9-42aa-a88d-76cd93b0335f",
                            Email = "duocn342@gmail.com",
                            EmailConfirmed = false,
                            FullName = "Được Nguyễn",
                            Gender = "Male",
                            IsDisabled = false,
                            LockoutEnabled = false,
                            PasswordHash = "AQAAAAEAACcQAAAAEFcaz4EqoCLoEenHDuJHWR2mYOwVTQ/tTfgfGz08SKaLVbdCevyHdhNGRmHIl0oIzw==",
                            PhoneNumber = "0924721184",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserCode = "U0004",
                            UserName = "duocn"
                        },
                        new
                        {
                            Id = 5,
                            AccessFailedCount = 0,
                            Address = "District 11, HCM City",
                            ConcurrencyStamp = "e7db0010-d8c7-4986-a0fa-ca44a2dcab77",
                            Email = "nhit3450@gmail.com",
                            EmailConfirmed = false,
                            FullName = "Nhi Tran",
                            Gender = "Female",
                            IsDisabled = false,
                            LockoutEnabled = false,
                            PasswordHash = "AQAAAAEAACcQAAAAEACNIkFj+g0vT0uAulyYYz/PeiC3f/klfy1KLxmY4xf4NXt88TalDgF78r1u3NCBYA==",
                            PhoneNumber = "0924721184",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserCode = "U0005",
                            UserName = "nhit345"
                        },
                        new
                        {
                            Id = 6,
                            AccessFailedCount = 0,
                            Address = "District 1, HCM City",
                            ConcurrencyStamp = "f97ae005-750e-4e0f-81fe-99e6190a18fd",
                            Email = "phuognt234@gmail.com",
                            EmailConfirmed = false,
                            FullName = "Phương Trần",
                            Gender = "Female",
                            IsDisabled = false,
                            LockoutEnabled = false,
                            PasswordHash = "AQAAAAEAACcQAAAAEC8m+sObuLktVLQHVJt8/NO1L/rk5D7DxU8iKdXXnnAMwxVmZtWWC/XJPBqTEmYf2A==",
                            PhoneNumber = "0924721184",
                            PhoneNumberConfirmed = false,
                            TwoFactorEnabled = false,
                            UserCode = "U0006",
                            UserName = "phuongt234"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole<int>", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("SaiGonHiker.DataAccessor.Entities.Users", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("SaiGonHiker.DataAccessor.Entities.Users", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole<int>", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SaiGonHiker.DataAccessor.Entities.Users", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("SaiGonHiker.DataAccessor.Entities.Users", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
